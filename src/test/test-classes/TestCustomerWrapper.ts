import { Customer } from '../../classes';

export class TestCustomerWrapper {
  static createTestCustomer(phoneNumber: string): Customer {
    const customer = new Customer('Test User', 'Test address', phoneNumber);
    return customer;
  }
}

export default TestCustomerWrapper;
