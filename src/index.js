import Application from './application';
import path from 'path';
import fakeDbInterface from './lib/db/fakeDbInterface';
import getCommissionConfig from './getCommissionConfig';

const [inputFilePath] = process.argv.slice(2);

(async () => {
  let commissionConfig = await getCommissionConfig();

  const inputJson = (await import(path.resolve(inputFilePath))).default;

  inputJson.forEach((request) => {
    // remap request to CamelCase, due to airbnb eslint rules
    const {
      user_type: userType,
      user_id: userId,
      type,
      operation: { amount, currency },
      date,
    } = request;

    const remapRequest = {
      userType,
      userId,
      type,
      amount,
      currency,
      date,
      commissionConfig,
    };

    const app = new Application(remapRequest);

    const commission = app.doTransaction(remapRequest);

    console.log(Number.parseFloat(commission).toFixed(2));
    // commit to db
    fakeDbInterface.insert({ ...remapRequest, commission });
  });
})();
