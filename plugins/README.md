<div align="center">
	<br />
	<p>
		<img src="https://raw.githubusercontent.com/ALxOver/wave-dev/main/resources/images/wave-background.png" width="280" alt="Wave background" />
	</p>
	<br />
	<p>
		<a href="https://github.com/ALxOver/wave-dev/tree/main"><img src="https://img.shields.io/badge/Repository-black?style=flat&logo=github&link=https%3A%2F%2Fgithub.com%2FALxOver%2Fwave-dev%2Ftree%2Fmain" alt="npm package" /></a>
		<a href="https://github.com/ALxOver/wave-dev/tree/main"><img src="https://img.shields.io/github/contributors/ALxOver/wave-dev?logo=github&label=Contributors&color=black" alt="Github contributors" /></a>
		<a href="https://www.npmjs.com/package/@wave-dev/plugins"><img src="https://img.shields.io/npm/v/%40wave-dev/plugins?logo=npm" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/@wave-dev/plugins"><img src="https://img.shields.io/npm/l/%40wave-dev%2Fplugins?logo=npm" alt="License" /></a>
	</p>
</div>

## About

Wave is a **Discord Bot** which is being developed by me, Brayan Kook.
In order to have an organized code, i've created this utilities to make it easier and decided to make it public so anyone can use them.

## Packcages

- `@wave-dev/plugins` ([source](./README.md)) Useful plugins for development.

## Instalation

Node.js 16.9.0 or newer is required.

```
npm install @wave-dev/plugins
```

## List of available plugins

- **[KVString](./typings/classes/KVString.d.ts)** allows you to store data by **(key:value)** pairs in a single string and format it interpreting it as different data types as well.
  This was powered by **Discord Bot Development**.
  In order to avoid databases and collection for **storing short data**, i use strings to do it in the **[Message Component Custom ID](https://discord.com/developers/docs/interactions/message-components#custom-id)**
  So whenever i need to store the target of an interaction or command, page or any other data, this is a strong way to do it because **it will be exiting forever until the message/component get deleted**.

  ```ts
  // Creating it from the constructor:
  import { KVString } from "kvstring";
  const myKVString = new KVString({
    // Setting the values with their keys
    values: [
      { key: "name", value: "Sam" },
      { key: "age", value: "20" },
    ],
    // Specifying the max length for the result string
    maxLength: 100,
  });
  ```

  ```ts
  // Creating it by its methods
  import { KVString } from "kvstring";
  const myKVString = new KVString();
  myKVString.setMaxLength(100);
  myKVString.addValue("name", "Sam");
  if (true) myKVString.addValue("age", "20");
  ```

  ```ts
  // Getting data
  const name = myKVString.getString("name", true); // "Sam"
  const age = myKVString.getNumber("age", true); // 20
  const surname = myKVString.getString("surname"); // undefined
  const petName = myKVString.getString("petName", true); // Error (Unnnable to get the value named petName)
  const { name, age } = myKVString.toObject("name", "age"); // All properties are of type string
  console.log(name); // "Sam"
  console.log(parseInt(age)); // 20
  ```

- **[StringBuilder](./typings/classes/StringBuilder.d.ts)** allows you to dynamicaly create an string.
  ```ts
  import { StringBuilder } from "kvstring";
  const content = new StringBuilder("Hummmm...");
  if (1 + 1 === 2) content.update("it's true!", ", ");
  console.log(content.toString()); // "Hummmm..., it's true!"
  ```
- **[stringEquals](./typings/functions/stringEcuals.d.ts)** allows you to get the equality between two strings with additional options.
  ```ts
  import { stringEquals } from "kvstring";
  stringEquals("Apple", "Apple"); // true
  stringEquals("My name is Jhon", "JHON", {
    allowCaseSensitive: true,
    allowIncludes: "booth",
  }); // true
  ```
- **[JSONStorage](./typings/classes/JSONStorage.d.ts)** allows you to store JSON data in JSON files like a local Database

  ```ts
  // fruits.ts
  import { JSONStorage, BaseDocumentData } from "kvstring";
  import { join } from "path";
  // Create an interface for the document data
  interface FruitData extends BaseDocumentData {
    name: string;
    amount: number;
  }
  // Create the dir and JSON file
  const path = join(process.cwd(), "storage", "fruits.json");
  const Fruits = JSONStorage.store<FruitData>(path);
  // Create the first document
  Fruits.create({ id: "12345678912345678", name: "Apple", amount: 1 });
  // Get the document by its id
  const fruit = Fruits.getById("12345678912345678", true);
  // Modify and save the document
  fruit.name = "Lemon";
  fruit.amount++;
  fruit.save();
  console.log(Fruits.getById("12345678912345678", true)); // { id: "12345678912345678", name: "Lemon", amount: 3 }
  ```
