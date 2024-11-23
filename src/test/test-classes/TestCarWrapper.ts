import { Car } from '../../classes';

export class TestCarWrapper {
  static createTestCar(numberSign: string, availability: boolean = true): Car {
    const car = new Car(numberSign, 'TestBrand', 'TestModel', 2020);
    car.availabilityStatus = availability;
    return car;
  }
}

export default TestCarWrapper;
