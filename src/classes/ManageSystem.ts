import { IManageSystem } from '../interfaces/index.ts';
import { Car, Customer } from './';

class ManageSystem implements IManageSystem {
  customers: Customer[];
  cars: Car[];
  bookedCars: { [key: string]: Car['numberSign'][] } = {};

  constructor(customers: Customer[] = [], cars: Car[] = []) {
    this.customers = customers;
    this.cars = cars;
  }

  addCar(newCar: Car) {
    this.cars.push(newCar);
  }

  registrationNewCustomer(newCustomer: Customer) {
    this.customers.push(newCustomer);
  }

  rentCar(customer: Customer['phoneNumber'], numberSign: Car['numberSign']) {
    const car = this.cars.find((car) => car.numberSign === numberSign);
    if (!car) throw new Error('Car not found');
    if (!car.availabilityStatus) throw new Error('Car is rented already');

    if (this.customers.findIndex((obj) => obj.phoneNumber === customer) < 0) {
      throw new Error('Customer not found');
    }

    if (!this.bookedCars[customer]) {
      this.bookedCars[customer] = [];
    }
    this.bookedCars[customer].push(car.numberSign);

    car.availabilityStatus = false;
  }

  returnCar(customer: Customer['phoneNumber'], numberSign: Car['numberSign']) {
    const car = this.cars.find((car) => car.numberSign === numberSign);
    if (!car) throw new Error('Car not found');

    if (!this.bookedCars[customer]) throw new Error('Customer doesn`t have rented cars');

    if (this.bookedCars[customer].findIndex((numSign) => numSign === numberSign) < 0) {
      throw new Error('Client didn`t rent this car');
    }

    this.bookedCars[customer] = this.bookedCars[customer].filter(
      (numSign) => numSign !== car.numberSign
    );

    car.availabilityStatus = true;
  }

  searchCar(
    mark?: Car['mark'],
    model?: Car['model'],
    availabilityStatus?: Car['availabilityStatus']
  ) {
    let array = this.cars;
    if (mark) {
      array = array.filter((obj) => obj.mark === mark);
    }
    if (model) {
      array = array.filter((obj) => obj.model === model);
    }
    if (availabilityStatus) {
      array = array.filter((obj) => obj.availabilityStatus === availabilityStatus);
    }
    return array;
  }
}

export default ManageSystem;
