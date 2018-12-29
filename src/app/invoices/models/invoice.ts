export class Invoice { // Invoice Model
  _id: string;
  item: string;
  quantity: number;
  date: Date;
  dueDate: Date;
  rate: number;
  tax: number;
}
