import { Car, Customer, ManageSystem } from './classes/index.ts';

function main() {
  const cars = [
    new Car('AX 7777 EE', 'Audi', 'RS7', 2022),
    new Car('AX 2222 EE', 'Audi', 'A8', 2024),
    new Car('AX 1111 EE', 'Audi', 'Q8', 2020),
    new Car('AX 6666 EE', 'BMW', 'M4', 2024),
    new Car('AX 5555 EE', 'Ferrari', 'Diablo', 2020),
    new Car('AX 4444 EE', 'Lada', 'Calina', 1980),
    new Car('AX 3333 EE', 'Ford', 'Focus', 2020)
  ];

  const customers = [
    new Customer('Alexandr Sitailo', 'Gagarina 20', '+380702020222'),
    new Customer('Alexandr Sazhyn', 'Sumska 45', '+380994020222'),
    new Customer('Anton Basenko', 'Gagarina 20', '+380665030222')
  ];

  const system = new ManageSystem();

  cars.forEach((car) => system.addCar(car));
  customers.forEach((customer) => system.registrationNewCustomer(customer));

  console.log(system.bookedCars);

  system.rentCar(customers[0].phoneNumber, 'AX 5555 EE');
  system.rentCar(customers[1].phoneNumber, 'AX 7777 EE');

  console.log(system.bookedCars);

  system.returnCar(customers[0].phoneNumber, 'AX 5555 EE');

  console.log(system.bookedCars);

  console.log('All cars');
  console.log(system.searchCar());

  console.log('All Audi');
  console.log(system.searchCar('Audi'));

  console.log('All Audi RS7');
  console.log(system.searchCar('Audi', 'RS7'));

  console.log('All availabile Audi RS7');
  console.log(system.searchCar('Audi', 'RS7', true));

  console.log('\nReturning Audi RS7...\n');
  system.returnCar(customers[1].phoneNumber, 'AX 7777 EE');

  console.log('All availabile Audi RS7');
  console.log(system.searchCar('Audi', 'RS7', true));
}
main();
