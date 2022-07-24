import axios from 'axios';
import $ from './lib/money/money';

function percentToDecimal(amount) {
  // do subtraction with multiply, after adding subtraction support to Money, refactor should happen
  return $(amount).multiply(0.01).value;
}

async function downloadConfig() {
  try {
    // querying APIs, I suppose the output is hard response
    const { data: naturalCashOut } = await axios.get('https://developers.paysera.com/tasks/api/cash-out-natural');
    const { data: JuridicalCashOut } = await axios.get('https://developers.paysera.com/tasks/api/cash-out-juridical');
    const { data: cashIn } = await axios.get('https://developers.paysera.com/tasks/api/cash-in');

    return { cashIn, naturalCashOut, JuridicalCashOut };
  } catch (err) {
    throw new AggregateError([err], 'can not download commission config', { cause: err });
  }
}

export default async function getcommissionConfig() {
  const { cashIn, naturalCashOut, JuridicalCashOut } = await downloadConfig();
  cashIn.ratio = percentToDecimal(cashIn.percents);
  naturalCashOut.ratio = percentToDecimal(naturalCashOut.percents);
  JuridicalCashOut.ratio = percentToDecimal(JuridicalCashOut.percents);

  let config = {
    natural: { cashIn, cashOut: naturalCashOut },
    juridical: { cashIn, cashOut: JuridicalCashOut },
  };

  return config;
}
