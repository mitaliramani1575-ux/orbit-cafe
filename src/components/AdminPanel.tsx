import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Plus,
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { db, auth, signInWithGoogle, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  setDoc, 
  serverTimestamp, 
  getDocs,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Transmission {
  id: string;
  name: string;
  email: string;
  message: string;
  type: 'contact' | 'membership';
  status: 'pending' | 'approved' | 'rejected';
  plan?: string;
  createdAt: any;
}

interface Member {
  id: string;
  name: string;
  email: string;
  plan: string;
  joinedAt: any;
  status: 'active' | 'inactive';
}

interface Space {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  category?: string;
}

const BOOKINGS = [
  { id: 1, user: 'Sarah Chen', space: 'Zen Pod A', date: 'May 14', time: '09:00 - 11:00', status: 'confirmed' },
  { id: 2, user: 'James Wilson', space: 'The Gallery', date: 'May 14', time: '13:00 - 15:00', status: 'pending' },
  { id: 3, user: 'Anya Rossi', space: 'Acoustic Pod 2', date: 'May 15', time: '10:00 - 12:00', status: 'confirmed' },
  { id: 4, user: 'David Park', space: 'Rooftop Lab', date: 'May 16', time: '14:00 - 17:00', status: 'confirmed' },
];

const INVENTORY = [
  { id: 1, item: 'Ethiopian Sidamo Beans', stock: '24kg', status: 'good', category: 'Coffee' },
  { id: 2, item: 'Oat Milk (Barista Ed.)', stock: '12 cases', status: 'low', category: 'Dairy/Alt' },
  { id: 3, item: 'Organic Matcha Powder', stock: '500g', status: 'critical', category: 'Tea' },
  { id: 4, item: 'Biodegradable Straws', stock: '2,000 units', status: 'good', category: 'Supplies' },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuditing, setIsAuditing] = useState(false);
  const [lastAudit, setLastAudit] = useState('2 hours ago');
  const [notification, setNotification] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && u.email === 'mitaliramani1575@gmail.com') {
        // Logged in as admin
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || user.email !== 'mitaliramani1575@gmail.com') return;

    const seedSpaces = async () => {
      const q = query(collection(db, 'spaces'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        const defaultSpaces = [
          { name: 'Zen Pod A', capacity: 1, currentOccupancy: 0, category: 'Private' },
          { name: ' Zen Pod B', capacity: 1, currentOccupancy: 0, category: 'Private' },
          { name: 'The Gallery', capacity: 20, currentOccupancy: 5, category: 'Shared' },
          { name: 'Rooftop Lab', capacity: 15, currentOccupancy: 2, category: 'Collaborative' },
          { name: 'Acoustic Suite 1', capacity: 4, currentOccupancy: 0, category: 'Meeting' },
        ];
        
        for (const space of defaultSpaces) {
          await setDoc(doc(collection(db, 'spaces')), space);
        }
      }
    };
    seedSpaces();

    setLoading(true);

    const unsubTrans = onSnapshot(query(collection(db, 'transmissions'), orderBy('createdAt', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transmission));
      setTransmissions(data);
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'transmissions'));

    const unsubMembers = onSnapshot(query(collection(db, 'members'), orderBy('joinedAt', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Member));
      setMembers(data);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'members'));

    const unsubSpaces = onSnapshot(collection(db, 'spaces'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Space));
      setSpaces(data);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'spaces'));

    return () => {
      unsubTrans();
      unsubMembers();
      unsubSpaces();
    };
  }, [user]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApproval = async (transmission: Transmission) => {
    try {
      // Check space availability (wise decision)
      // For simplicity, we'll assume the first available space has some room
      const availableSpace = spaces.find(s => s.currentOccupancy < s.capacity);
      
      if (!availableSpace) {
        showNotification("Approval failed: All spaces at maximum capacity.");
        return;
      }

      const batch = writeBatch(db);

      // 1. Update transmission status
      const transRef = doc(db, 'transmissions', transmission.id);
      batch.update(transRef, { status: 'approved' });

      // 2. Create member record
      const memberRef = doc(collection(db, 'members'));
      batch.set(memberRef, {
        name: transmission.name,
        email: transmission.email,
        plan: transmission.plan || 'Unlimited',
        joinedAt: serverTimestamp(),
        status: 'active'
      });

      // 3. Update space occupancy
      const spaceRef = doc(db, 'spaces', availableSpace.id);
      batch.update(spaceRef, {
        currentOccupancy: availableSpace.currentOccupancy + 1
      });

      await batch.commit();
      showNotification(`Membership approved for ${transmission.name}. Space allocated: ${availableSpace.name}`);

    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'approval-batch');
    }
  };

  const handleRejection = async (transId: string) => {
    try {
      await updateDoc(doc(db, 'transmissions', transId), { status: 'rejected' });
      showNotification("Transmission rejected.");
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'transmissions');
    }
  };

  const handleAudit = () => {
    setIsAuditing(true);
    showNotification('Starting system-wide inventory audit...');
    setTimeout(() => {
      setIsAuditing(false);
      setLastAudit('Just now');
      showNotification('Inventory audit complete. 4 items verified.');
    }, 2000);
  };

  if (!user || user.email !== 'mitaliramani1575@gmail.com') {
    return (
      <div className="min-h-screen bg-orbit-bg grain flex items-center justify-center p-6">
        <div className="max-w-md w-full p-12 rounded-3xl bg-white/[0.02] border border-white/10 text-center backdrop-blur-xl">
           <Logo className="w-20 h-20 mx-auto mb-8" />
           <h1 className="text-2xl font-display font-light text-orbit-cream mb-2 tracking-widest uppercase">Restricted Access</h1>
           <p className="text-orbit-gray text-sm mb-12">Central Intelligence Node #01 requires senior operator clearance.</p>
           <button 
             onClick={signInWithGoogle}
             className="w-full py-4 bg-orbit-accent text-orbit-bg font-bold tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-all text-xs uppercase"
           >
             Authenticate with Google
           </button>
           <button onClick={() => navigate('/')} className="mt-8 text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Return to Surface</button>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Live Members" value={members.length.toString()} grow="+12%" icon={Users} color="text-blue-400" />
        <StatCard label="Pending Transmission" value={transmissions.filter(t => t.status === 'pending').length.toString()} grow="+4%" icon={MessageSquare} color="text-orbit-accent" />
        <StatCard label="Avg Occupancy" value={spaces.length ? `${Math.round(spaces.reduce((acc, s) => acc + (s.currentOccupancy/s.capacity), 0) / spaces.length * 100)}%` : '0%'} grow="+2.1%" icon={TrendingUp} color="text-green-400" />
        <StatCard label="Revenue Est." value={`$${members.length * 450}`} grow="+18%" icon={BarChart3} color="text-orbit-warm" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-display font-light text-orbit-cream">Orbit Growth</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-orbit-accent text-orbit-bg text-[10px] uppercase tracking-widest font-bold">Live</button>
            </div>
          </div>
          <div className="flex-1 w-full relative flex items-end gap-2">
             {spaces.map((space, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${(space.currentOccupancy / space.capacity) * 100}%` }}
                   className="w-full bg-orbit-accent/40 rounded-t-sm hover:bg-orbit-accent transition-colors relative group"
                 >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 px-2 py-1 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                     {space.currentOccupancy}/{space.capacity}
                   </div>
                 </motion.div>
                 <span className="text-[8px] uppercase tracking-widest text-white/40 rotate-45 origin-left whitespace-nowrap mt-2">{space.name}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-display font-light text-orbit-cream">Recent Feed</h3>
            <button onClick={() => setActiveTab('messages')} className="text-orbit-accent text-[10px] font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {transmissions.slice(0, 5).map((msg, i) => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${msg.type === 'membership' ? 'bg-orbit-accent/20 text-orbit-accent' : 'bg-white/5 text-white/40'}`}>
                  {msg.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-medium text-orbit-cream truncate">{msg.name}</h4>
                    <span className="text-[10px] text-white/30">{msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}</span>
                  </div>
                  <p className="text-xs text-white/40 line-clamp-1">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-display font-light text-orbit-cream">Incoming Messages</h2>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Type</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Sender</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Message</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transmissions.map((msg, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-6">
                  <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${msg.type === 'membership' ? 'border-orbit-accent text-orbit-accent bg-orbit-accent/10' : 'border-white/20 text-white/40'}`}>
                    {msg.type}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-orbit-cream">{msg.name}</span>
                    <span className="text-[10px] text-white/30">{msg.email}</span>
                  </div>
                </td>
                <td className="px-6 py-6 max-w-md">
                   <p className="text-sm text-orbit-gray line-clamp-2 italic">"{msg.message}"</p>
                </td>
                <td className="px-6 py-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                    msg.status === 'pending' ? 'bg-orbit-warm/20 text-orbit-warm' : 
                    msg.status === 'approved' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                  }`}>
                    {msg.status}
                  </span>
                </td>
                <td className="px-6 py-6">
                  {msg.status === 'pending' && (
                    <div className="flex gap-2">
                       {msg.type === 'membership' && (
                         <button 
                           onClick={() => handleApproval(msg)}
                           className="p-2 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400 transition-colors hover:text-white"
                           title="Approve Membership"
                         >
                           <CheckCircle2 size={18} />
                         </button>
                       )}
                       <button 
                        onClick={() => handleRejection(msg.id)}
                        className="p-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400 transition-colors hover:text-white"
                        title="Reject/Archive"
                       >
                         <XCircle size={18} />
                       </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-display font-light text-orbit-cream">Active Bookings</h2>
        <button 
          onClick={() => showNotification("Booking system in Read-Only mode for maintenance.")}
          className="bg-orbit-accent text-orbit-bg px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] transition-transform"
        >
          <Plus size={16} /> New Booking
        </button>
      </div>
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">User</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Space</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Date & Time</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((booking, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-6">
                  <span className="text-sm font-medium text-orbit-cream">{booking.user}</span>
                </td>
                <td className="px-6 py-6">
                  <span className="text-sm text-orbit-gray">{booking.space}</span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-orbit-cream">{booking.date}</span>
                    <span className="text-[10px] text-white/30">{booking.time}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                    booking.status === 'confirmed' ? 'bg-green-400/20 text-green-400' : 'bg-orbit-warm/20 text-orbit-warm'
                  }`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-display font-light text-orbit-cream">Membership Directory</h2>
      </div>
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Name</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Plan</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Joined</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-6">
                  <span className="text-sm font-medium text-orbit-cream">{member.name}</span>
                  <div className="text-[10px] text-white/30">{member.email}</div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-sm text-orbit-gray">{member.plan}</span>
                </td>
                <td className="px-6 py-6 text-sm text-white/30">
                  {member.joinedAt?.toDate ? new Date(member.joinedAt.toDate()).toLocaleDateString() : '...'}
                </td>
                <td className="px-6 py-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                    member.status === 'active' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                  }`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h2 className="text-3xl font-display font-light text-orbit-cream">Workspace Capacity</h2>
          <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Real-time occupancy monitoring</p>
        </div>
        <button 
          onClick={handleAudit}
          disabled={isAuditing}
          className={`bg-white/10 text-orbit-cream px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${isAuditing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
        >
          {isAuditing ? (
            <>
              <div className="w-3 h-3 border-2 border-orbit-accent border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Layers size={16} /> Audit Inventory
            </>
          )}
        </button>
      </div>
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Space Name</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Current / Max</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Utilization</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map((space, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-6">
                  <span className="text-sm font-medium text-orbit-cream">{space.name}</span>
                </td>
                <td className="px-6 py-6 font-mono text-sm text-orbit-gray">
                  {space.currentOccupancy} / {space.capacity}
                </td>
                <td className="px-6 py-6">
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                     <div 
                       className={`h-full transition-all duration-1000 ${
                         (space.currentOccupancy / space.capacity) > 0.9 ? 'bg-red-400' :
                         (space.currentOccupancy / space.capacity) > 0.7 ? 'bg-orbit-warm' : 'bg-orbit-accent'
                       }`}
                       style={{ width: `${Math.min((space.currentOccupancy / space.capacity) * 100, 100)}%` }}
                     />
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                    space.currentOccupancy >= space.capacity ? 'bg-red-400/20 text-red-400' : 'bg-green-400/20 text-green-400'
                  }`}>
                    {space.currentOccupancy >= space.capacity ? 'Full' : 'Available'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-12 p-8 rounded-3xl bg-orbit-accent/5 border border-orbit-accent/10">
         <h4 className="text-xs uppercase tracking-widest font-bold text-orbit-accent mb-4">Stock Inventory (Legacy Support)</h4>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INVENTORY.map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] text-white/30 truncate">{item.item}</p>
                <div className="flex justify-between items-baseline">
                  <span className="text-orbit-cream font-bold text-sm">{item.stock}</span>
                  <span className={`text-[8px] uppercase tracking-tighter ${item.status === 'good' ? 'text-green-400' : 'text-orbit-warm'}`}>{item.status}</span>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-orbit-bg grain flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white/[0.01] border-r border-white/5 p-8 flex flex-col fixed h-screen z-50">
        <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate('/')}>
          <Logo className="w-10 h-10" />
          <span className="font-display font-bold text-lg tracking-[0.2em] uppercase text-orbit-cream">Orbit <span className="text-orbit-accent italic">Admin</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'dashboard' ? 'bg-orbit-accent text-orbit-bg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm uppercase tracking-widest">Dashboard</span>
          </button>
          <button 
             onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'messages' ? 'bg-orbit-accent text-orbit-bg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare size={18} />
            <span className="text-sm uppercase tracking-widest text-left">Transmissions</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'bookings' ? 'bg-orbit-accent text-orbit-bg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar size={18} />
            <span className="text-sm uppercase tracking-widest">Bookings</span>
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'members' ? 'bg-orbit-accent text-orbit-bg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={18} />
            <span className="text-sm uppercase tracking-widest">Members</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'inventory' ? 'bg-orbit-accent text-orbit-bg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers size={18} />
            <span className="text-sm uppercase tracking-widest text-left">Spaces & Stock</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5">
            <Settings size={18} />
            <span className="text-sm uppercase tracking-widest text-left">Settings</span>
          </button>
          <button 
            onClick={() => auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut size={18} />
            <span className="text-sm uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div className="flex flex-col">
            <h1 className="text-sm uppercase tracking-[0.3em] font-bold text-orbit-accent mb-1">Central Intelligence</h1>
            <p className="text-orbit-gray text-xs">Orbit Operations Node #01 - San Francisco</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orbit-accent rounded-full border-2 border-orbit-bg" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-bold text-orbit-cream">{user?.displayName || 'Senior Operator'}</p>
                <p className="text-[10px] uppercase text-white/30 tracking-widest">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orbit-accent/20 border border-orbit-accent/40 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  <Users size={18} className="text-orbit-accent" />
                )}
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
             <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-orbit-accent border-t-transparent rounded-full animate-spin" />
             </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'messages' && renderMessages()}
              {activeTab === 'bookings' && renderBookings()}
              {activeTab === 'members' && renderMembers()}
              {activeTab === 'inventory' && renderInventory()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-12 right-12 z-[100] px-6 py-4 bg-orbit-accent text-orbit-bg font-bold rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <Bell size={20} />
            <span className="text-sm tracking-wide">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, grow, icon: Icon, color }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] glass-card"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-white/[0.05] ${color}`}>
          <Icon size={20} />
        </div>
        <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
          <ArrowUpRight size={10} /> {grow}
        </span>
      </div>
      <h3 className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">{label}</h3>
      <p className="text-3xl font-display font-light text-orbit-cream">{value}</p>
    </motion.div>
  );
}

