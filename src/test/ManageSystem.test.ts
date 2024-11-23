import ManageSystem from '../classes/ManageSystem';
import { Car, Customer } from '../classes';
import TestCarWrapper from './test-classes/TestCarWrapper';
import TestCustomerWrapper from './test-classes/TestCustomerWrapper';

describe('ManageSystem', () => {
  let manageSystem: ManageSystem;
  let car1: Car, car2: Car;
  let customer1: Customer, customer2: Customer;

  beforeEach(() => {
    car1 = new Car('ABC123', 'Toyota', 'Corolla', 2021);
    car2 = new Car('DEF456', 'Honda', 'Civic', 2020);

    customer1 = new Customer('John Doe', 'Symska 21', '+380991111111');
    customer2 = new Customer('Jack Black', 'Shevchenka 12', '+380992222222');

    manageSystem = new ManageSystem([customer1, customer2], [car1, car2]);
  });

  test('should create ManageSystem instance with customers and cars', () => {
    const newManageSystem = new ManageSystem();

    expect(newManageSystem.customers.length).toBe(0);
    expect(newManageSystem.cars.length).toBe(0);
  });

  test('adds a new car', () => {
    const newCar = TestCarWrapper.createTestCar('LMN123');
    manageSystem.addCar(newCar);

    expect(manageSystem.cars).toContain(newCar);
  });

  test('registers a new customer', () => {
    const newCustomer = TestCustomerWrapper.createTestCustomer('+380993333333');
    manageSystem.registrationNewCustomer(newCustomer);

    expect(manageSystem.customers).toContain(newCustomer);
  });

  test('rents a car to a customer', () => {
    manageSystem.rentCar(customer1.phoneNumber, car1.numberSign);

    expect(manageSystem.bookedCars[customer1.phoneNumber]).toContain(car1.numberSign);
    expect(car1.availabilityStatus).toBe(false);
  });

  test('throws an error when renting a non-existent car', () => {
    expect(() => {
      manageSystem.rentCar(customer1.phoneNumber, 'NONEXISTENT');
    }).toThrow('Car not found');
  });

  test('throws an error when has a non-existent customer', () => {
    expect(() => {
      manageSystem.rentCar('NONEXISTENT', car1.numberSign);
    }).toThrow('Customer not found');
  });

  test('throws an error when car is rented already', () => {
    expect(() => {
      manageSystem.rentCar(customer1.phoneNumber, car1.numberSign);
      manageSystem.rentCar(customer2.phoneNumber, car1.numberSign);
    }).toThrow('Car is rented already');
  });

  test('returns a car from a customer', () => {
    manageSystem.rentCar(customer1.phoneNumber, car1.numberSign);
    manageSystem.returnCar(customer1.phoneNumber, car1.numberSign);

    expect(manageSystem.bookedCars[customer1.phoneNumber]).not.toContain(car1.numberSign);
    expect(car1.availabilityStatus).toBe(true);
  });

  test('throws an error when returning a car that is not exist', () => {
    expect(() => {
      manageSystem.returnCar(customer1.phoneNumber, 'NONEXISTENT');
    }).toThrow('Car not found');
  });

  test('throws an error when returning a car when customer haven`t rent car', () => {
    expect(() => {
      manageSystem.returnCar(customer1.phoneNumber, car1.numberSign);
    }).toThrow('Customer doesn`t have rented cars');
  });

  test('throws an error when returning a car that is not rented', () => {
    expect(() => {
      manageSystem.rentCar(customer1.phoneNumber, car1.numberSign);
      manageSystem.returnCar(customer1.phoneNumber, car2.numberSign);
    }).toThrow('Client didn`t rent this car');
  });

  test('searches for cars by mark', () => {
    const result = manageSystem.searchCar('Toyota');
    expect(result).toEqual([car1]);
  });

  test('searches for cars by model', () => {
    const result = manageSystem.searchCar(undefined, 'Civic');
    expect(result).toEqual([car2]);
  });

  test('searches for available cars', () => {
    manageSystem.rentCar(customer1.phoneNumber, car1.numberSign);
    const result = manageSystem.searchCar(undefined, undefined, true);

    expect(result).toEqual([car2]);
  });
});
