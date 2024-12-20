import ICar from './ICar';
import ICustomer from './ICustomer';

interface IManageSystem {
  customers: ICustomer[];
  cars: ICar[];
  bookedCars: {
    [key: string]: ICar['numberSign'][];
  };
  addCar: (newCar: ICar) => void;
  registrationNewCustomer: (newCustomer: ICustomer) => void;
  rentCar: (customer: ICustomer['phoneNumber'], numberSign: ICar['numberSign']) => void;
  returnCar: (customer: ICustomer['phoneNumber'], numberSign: ICar['numberSign']) => void;
  searchCar: (
    mark?: ICar['mark'],
    model?: ICar['model'],
    availabilityStatus?: ICar['availabilityStatus']
  ) => ICar[];
}

export default IManageSystem;
