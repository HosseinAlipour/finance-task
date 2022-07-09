import Application from './application';
import path from 'path';
import fakeDbInterface from './lib/db/fakeDbInterface';

const [inputFilePath] = process.argv.slice(2);

(async () => {
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
    };

    // commit to db
    fakeDbInterface.insert({ ...remapRequest, commission });
  });
})();
