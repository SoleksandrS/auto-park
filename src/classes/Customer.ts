import { ICustomer } from '../interfaces/index.ts';

class Customer implements ICustomer {
  name: string;
  address: string;
  phoneNumber: number;

  constructor(name: string, address: string, phoneNumber: number) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}

export default Customer;
