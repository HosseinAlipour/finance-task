import Application from './application';
import path from 'path';
import fakeDbInterface from './lib/db/fakeDbInterface';

const [inputFilePath] = process.argv.slice(2);

(async () => {
  const inputJson = (await import(path.resolve(inputFilePath))).default;

  console.log(inputJson);
})();
