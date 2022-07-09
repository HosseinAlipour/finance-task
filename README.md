Thank you for allowing me to submit this task. Some notes about the project:

- To bypass Airbnb Eslint rules, I had to implement static methods, but this will be refactored when needed.

- For maintainability and extensibility I would offer Typescript as it has strict type rules and it has tools to follow SOLID principles. I have included the file `example-design-in-typescript.ts` for demonstration of how I would do it in typescript, but, for the sake of following the test rules, I decided to go with node.js.

- Some codes don't have unit testings, this is because I follow strictly `Veladimir Khoridov` and it's book `unit test principles, practices and patterns` which categorizes codes into domain-model-algorithm, trivial code, controller code, and overcomplicated code. I only tested the first type. also, the `dbFakeInterface.js` doesn't have any test as it's a Fake.

- No explicit currency name was used, but it would be no mess to add multi-currency support in short time without breaking stuff

- it took me about 5 hours to do it, and only 2 hours spent to read Airbnb Eslint rules.

first make sure you have nodejs and yarn installed.

```
node --version
yarn --version
```

to run the project clone and install packages and build the project

```
git clone <the repository url>
yarn install
yarn build
```

to run the code

```
node ./lib YOUR_INPUT_FILE.json
```

I look forward to hearing from you about the feedback of my task, and please do not hesitate to contact me if I can provide additional information.
