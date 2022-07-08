import Person from './Person';
import JuridicalTransaction from '../transaction/JuridicalTransaction';

export default class LegalPerson extends Person {
  static createTransaction() {
    return JuridicalTransaction;
  }
}
