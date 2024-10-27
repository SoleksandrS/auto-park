import { ICustomer } from '../interfaces/index.ts';

class Customer implements ICustomer {
  name: string;
  address: string;
  phoneNumber: string;

  constructor(name: string, address: string, phoneNumber: string) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}

export default Customer;
