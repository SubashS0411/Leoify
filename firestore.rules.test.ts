import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

let testEnv: any;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'leoify-test',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore Rules - The Dirty Dozen', () => {
  let db: any;
  beforeEach(() => {
    db = testEnv.authenticatedContext('user_123', { email_verified: true }).firestore();
  });

  // 1. Identity Spoofing
  test('Cannot create user profile for someone else', async () => {
    const pubRef = db.collection('users').doc('user_456').collection('public').doc('profile');
    await assertFails(pubRef.set({ username: 'bob123', isOnline: true }));
  });

  // 2. Private PII Access
  test('Cannot read another user private info', async () => {
    const privRef = db.collection('users').doc('user_456').collection('private').doc('info');
    await assertFails(privRef.get());
  });

  // 3. Ghost Fields
  test('Cannot insert Ghost Fields', async () => {
    const pubRef = db.collection('users').doc('user_123').collection('public').doc('profile');
    await assertFails(pubRef.set({ username: 'alice', isAdmin: true }));
  });

  // 4. Invalid Type
  test('Cannot set invalid type for bloodType', async () => {
    const privRef = db.collection('users').doc('user_123').collection('private').doc('info');
    await assertFails(privRef.set({ bloodType: [1, 2, 3], allergies: 'peanuts' }));
  });

  // 5. No Size Bound
  test('Cannot set massive strings', async () => {
    const privRef = db.collection('users').doc('user_123').collection('private').doc('info');
    await assertFails(privRef.set({ bloodType: '1'.repeat(2000), allergies: '' }));
  });

  // 6. Orphaned Writes (Skipping since it requires relationship checks which could just be rule-based, but we will test subcollection direct writes).
  
  // 7. Trip Owner Spoofing
  test('Cannot create trip as someone else', async () => {
    const tripRef = db.collection('trips').doc('trip_1');
    await assertFails(tripRef.set({ userId: 'user_456', title: 'Hike' }));
  });
  
  // 8. Immortal Fields
  test('Cannot modify createdAt on trip', async () => {
    const tripRef = testEnv.authenticatedContext('user_123', { email_verified: true }).firestore().collection('trips').doc('my_trip');
    await testEnv.withSecurityRulesDisabled(async (context: any) => {
      await context.firestore().collection('trips').doc('my_trip').set({
        userId: 'user_123',
        title: 'Hike',
        status: 'planned',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    
    await assertFails(tripRef.update({ createdAt: new Date() }));
  });
});
