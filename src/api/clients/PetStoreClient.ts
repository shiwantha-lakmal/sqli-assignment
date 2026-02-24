import { faker } from '@faker-js/faker';
import { BaseClient } from './BaseClient';
import { getPetstoreBaseURL } from '@config/env.config';

export interface PetStoreUser {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus?: number;
}

export interface Pet {
  id: number;
  name: string;
  status: 'available' | 'pending' | 'sold';
  category?: { id: number; name: string };
  photoUrls?: string[];
  tags?: { id: number; name: string }[];
}

export interface PetTuple {
  id: number;
  name: string;
}

export class PetStoreUserFactory {
  static create(overrides: Partial<PetStoreUser> = {}): PetStoreUser {
    return {
      id: faker.number.int({ min: 100000, max: 999999 }),
      username: `sqli_${faker.internet.username().toLowerCase()}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12, memorable: false }),
      phone: faker.phone.number(),
      userStatus: 1,
      ...overrides,
    };
  }
}

export class PetStoreClient extends BaseClient {
  constructor() {
    super(getPetstoreBaseURL());
  }

  async initialize(): Promise<void> {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async createUser(userData: PetStoreUser): Promise<{ code: number; type: string; message: string }> {
    const response = await this.post('/user', userData as Record<string, any>);
    return await this.handleResponse(response);
  }

  async getUser(username: string): Promise<PetStoreUser> {
    const response = await this.get(`/user/${username}`);
    return await this.handleResponse<PetStoreUser>(response);
  }

  async getSoldPets(): Promise<PetTuple[]> {
    const response = await this.get('/pet/findByStatus', { status: 'sold' });
    const pets = await this.handleResponse<Pet[]>(response);
    return pets
      .filter((pet) => pet.name && pet.name.trim() !== '')
      .map((pet) => ({ id: pet.id, name: pet.name }));
  }

}
