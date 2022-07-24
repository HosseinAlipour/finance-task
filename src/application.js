import NaturalPerson from './person/NaturalPerson';
import JuridicalPerson from './person/JuridicalPerson';

export default class application {
  constructor({ userType, commissionConfig }) {
    switch (userType) {
      case 'juridical':
        this.person = new JuridicalPerson(commissionConfig.juridical);
        break;
      case 'natural':
        this.person = new NaturalPerson(commissionConfig.natural);
        break;
      default:
        throw new Error('user type not recognized');
    }
  }

  doTransaction(request) {
    const transaction = this.person.createTransaction();
    switch (request.type) {
      case 'cash_in':
        return transaction.cashIn(request);

      case 'cash_out':
        return transaction.cashOut(request);

      default:
        throw new Error('operation type not recognized');
    }
  }
}
