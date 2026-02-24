import { test, expect } from '@playwright/test';
import { PetStoreClient } from '../src/api/clients/PetStoreClient';
import { PetNameAnalyzer } from '../src/config/util.config';

/**
 * Exercise 2: Data Handling in APIs - Pet Inventory
 * Fetch sold pets, list {id, name} tuples, and analyze name frequency.
 */

const SEP = '━'.repeat(53);

test.describe('Exercise 2 - API: PetStore Sold Pets Analysis', () => {
  let client: PetStoreClient;
  let analyzer: PetNameAnalyzer;
  let soldPets: Awaited<ReturnType<PetStoreClient['getSoldPets']>>;

  test.beforeAll(async () => {
    client = new PetStoreClient();
    await client.initialize();
    soldPets = await client.getSoldPets();
    analyzer = new PetNameAnalyzer(soldPets);
  });

  test('should fetch sold pets from GET /pet/findByStatus and list as {id, name} tuples', async () => {
    const tuples = analyzer.listTuples();

    console.log(`\n━━━ GET /pet/findByStatus?status=sold ${'━'.repeat(15)}`);
    console.log(`  Total records fetched : ${tuples.length}`);
    console.log(SEP);

    expect(tuples.length).toBeGreaterThan(0);
    expect(typeof tuples[0].id).toBe('number');
    expect(typeof tuples[0].name).toBe('string');
  });

  test('should count name frequency and identify duplicates and list as {name:count} tuples', async () => {
    const frequency = analyzer.countByName();

    const duplicates = Object.entries(frequency)
      .filter(([, count]) => count > 1)
      .sort(([, a], [, b]) => b - a);

    console.log(`\n━━━ Duplicate Pet Names ${'━'.repeat(30)}`);
    duplicates.forEach(([name, count]) => {
      console.log(`  "${name}": ${count}`);
    });
    console.log(`\n  Total names with duplicates : ${duplicates.length}`);
    console.log(SEP);

    expect(Object.keys(frequency).length).toBeGreaterThan(0);
    expect(duplicates.length).toBeGreaterThan(0);
  });

});
