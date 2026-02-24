import { test, expect } from '@playwright/test';
import { PetStoreClient, PetStoreUserFactory } from '../src/api/clients/PetStoreClient';

/**
 * Exercise 2: Data Handling in APIs - User Management
 * Create a user via HTTP request, then retrieve their data.
 */

const SEP = '━'.repeat(53);

test.describe('Exercise 2 - API: PetStore User Management', () => {
  let client: PetStoreClient;
  const testUser = PetStoreUserFactory.create();

  test.beforeAll(async () => {
    client = new PetStoreClient();
    await client.initialize();
  });

  test('should create and retrieve a user via POST /user then GET /user/{username}', async () => {
    const created = await client.createUser(testUser);

    console.log(`\n━━━ POST /user ${'━'.repeat(39)}`);
    console.log(`  username : ${testUser.username}`);
    console.log(`  status   : ${created.code}`);
    console.log(`  message  : ${created.message}`);
    console.log(SEP);

    expect(created.code).toBe(200);

    const retrieved = await client.getUser(testUser.username);

    console.log(`\n━━━ GET /user/{username} ${'━'.repeat(29)}`);
    console.log(`  username  : ${retrieved.username}`);
    console.log(`  firstName : ${retrieved.firstName}`);
    console.log(`  lastName  : ${retrieved.lastName}`);
    console.log(`  email     : ${retrieved.email}`);
    console.log(SEP);

    expect(retrieved.username).toBe(testUser.username);
  });

});
