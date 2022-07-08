import NaturalTransaction from '../transaction/NaturalTransaction';
import Person from './Person';

export default class NaturalPerson extends Person {
  static createTransaction() {
    return NaturalTransaction;
  }
}
