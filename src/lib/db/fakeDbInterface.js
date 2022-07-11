/** a singleton (module) to store transaction */
import { isSameWeek } from 'date-fns';
import $ from '../money/money';

class FakeDbInterface {
  constructor() {
    this.collection = [];
  }

  insert(obj) {
    this.collection.push(obj);
  }

  getThisWeekTotalTransaction(type, { userId, date }) {
    const total = $(0);
    this.collection.forEach((entry) => {
      const sameUserId = entry.userId === userId;
      const sameType = entry.type === type;
      const happenedThisWeek = isSameWeek(new Date(date), new Date(entry.date), {
        weekStartsOn: 1 /* 0 is Sunday, 1 is Monday */,
      });

      if (sameUserId && happenedThisWeek && sameType) {
        return total.add(entry.amount);
      }

      return 0;
    });

    return total.value;
  }
}

export default new FakeDbInterface();
