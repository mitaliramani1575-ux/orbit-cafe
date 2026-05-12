# Security Specification - Orbit Café Control

## Data Invariants
1. A membership transmission must always start as 'pending'.
2. Only admins can approve or reject transmissions.
3. Space occupancy cannot exceed capacity (enforced by logic, rules guard the fields).
4. Members can only be created by admins (system-side approval).

## The Dirty Dozen Payloads (Rejection Targets)
1. **The Spoof**: Create transmission with `status: "approved"`.
2. **The Ghost**: Create transmission with `isVerified: true` (shadow field).
3. **The Poison ID**: Create transmission with 2KB junk string as ID.
4. **The Time Warp**: Create transmission with `createdAt` in the past.
5. **The Escalation**: Update a member record as a non-admin.
6. **The Read-All**: List all transmissions as non-admin.
7. **The Data Wipe**: Delete spaces as non-admin.
8. **The Huge Payload**: Send 5MB message in transmission.
9. **The Orphan**: Create member without a corresponding transmission (enforced by process).
10. **The Self-Admin**: Try to write to `/admins/{uid}`.
11. **The Type Shift**: Send `capacity: "lots"` (string instead of number).
12. **The Capacity Hack**: Update `currentOccupancy` as a non-admin.

## Rules Verification Plan
- Verify `isValidTransmission` blocks non-'pending' status on create.
- Verify `isAdmin` blocks read/write on restricted collections.
- Verify `isValidId` and type checks.
