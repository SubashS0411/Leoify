# Security Specification

## Data Invariants
1. A single user can only have one `users/{userId}/public` and one `users/{userId}/private/info` document.
2. The user can only be the owner (`userId` matches Auth UID).
3. A `trip` document cannot exist without a valid `userId` that belongs to the user creating it.
4. An `emergency_contact` document must belong directly to the correct `userId` subcollection stringly matching Auth UID.
5. `trips/{tripId}/liveLocations` can only be updated if the user is the owner of the `trip` document.
6. A trip's `status` can only be updated by the owner. Once a trip is `completed`, it cannot be switched back into `active` unless it has an admin role (we don't have an admin role logic right now).

## The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Creating a User Document (`users/{userId}/public`) for someone else's UID.
2. **Accessing Another person's Private PII**: `get` to `users/{otherUser}/private/info`.
3. **Ghost Fields**: Attempting to insert `isAdmin: true` into `users/{myUser}/public` or `private`.
4. **Invalid Type**: Setting `bloodType` as an array or object in `private/info`.
5. **No Size Bound**: Pushing 1.5MB to `allergies` string.
6. **Orphaned Writes**: Creating an `emergency_contact` in a non-existent `users/{userId}` structure without checking.
7. **Trip Owner Spoofing**: Creating a `trip` indicating `userId` as another UID.
8. **Updating Trip with invalid key**: Injecting `completedAt` to random date in trip creation.
9. **Status Shortcutting**: Setting a trip to `completed` while creating it (it must start as `planned` or `active`).
10. **Modifying Immortal Fields**: Trying to change `createdAt` on an existing trip.
11. **Malicious ID injection**: Pushing a `liveLocation` document ID as an overly long string (`isValidId` check).
12. **Client Blanket Read**: Running a global `where('userId', '==', 'random')` that should fail if the rules rely on `get()` instead of `resource.data` checking.
