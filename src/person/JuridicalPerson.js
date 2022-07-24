import Person from './Person';
import JuridicalTransaction from '../transaction/JuridicalTransaction';

export default class LegalPerson extends Person {
  createTransaction() {
    return new JuridicalTransaction(this.config);
  }
}
