import { ICar } from '../interfaces/index.ts';

class Car implements ICar {
  numberSign: string;
  mark: string;
  model: string;
  year: number;
  availabilityStatus = true;

  constructor(numberSign: string, mark: string, model: string, year: number) {
    this.numberSign = numberSign;
    this.mark = mark;
    this.model = model;
    this.year = year;
  }
}

export default Car;
