# 📦 my-utils-kit

A lightweight utility toolkit built with TypeScript, offering a collection of **string**, **object**, and **array** helper methods for everyday JavaScript/TypeScript development.

---

## ✨ Features

- ✅ TypeScript support with full type safety
- 🧠 Useful string, object, and array manipulation utilities
- 🔁 Deep clone, deep merge, flatten/unflatten, and more
- 🔍 Tiny, modular, and easy to use
- 🧪 Easy to test and extend

---

## 📦 Installation

```bash
npm install my-utils-kit
# or
yarn add my-utils-kit
```

---

## 🚀 Usage

```ts
import { camelCase, deepCloneObj, groupBy } from 'my-utils-kit';

console.log(camelCase('hello world'));         // ➜ helloWorld
console.log(deepCloneObj({ a: 1 }));           // ➜ { a: 1 }
console.log(groupBy([{ type: 'fruit', name: 'apple' }], 'type'));
```

---

## 📚 API Overview

### ✅ String Utilities

- `camelCase(str)`
- `kebabCase(str)`
- `snakeCase(str)`
- `capitalize(str)`
- `truncate(str, length)`
- `reverseString(str)`
- `capitalize(str)`
- `uncapitalize(str)`
- `padStart(str, length, char)`
- `padEnd(str, length, char)`
- `repeatString(str, times)`
- `isPalindrome(str)`
- `countOccurrences(str, char)`
- `removeSpaces(str)`
- `removeSpecialChars(str)`
- `escapeHTML(str)`
- `unescapeHTML(str)`
- `slugify(str)`
- `maskString(str, visibleChars, maskChar='*')`
- `stripTags(htmlStr)`
- `toAscii(str)`
- `toHex(str)`
- `toBase64(str)`
- `fromBase64(str)`
- `toBinary(str)`
- `fromBinary(str)`
- `randomString(length, chars?)`
- `swapCase(str)`
- `countWords(str)`
- `removeDuplicates(str)`
- `toTitleCase(str)`
- `isAnagram(str1, str2)`
- `findLongestWord(str)`



### ✅ Object Utilities

- `deepCloneObj(obj)`
- `deepMerge(obj1, obj2)`
- `flattenObject(obj)`
- `unflattenObject(flatObj)`
- `getNestedValue(obj, path)`
- `setNestedValue(obj, path, value)`
- `omit(obj, keys)`
- `pick(obj, keys)`
- `invertObj(obj)`
- `isEmpty(obj)`
- `hasKey(obj, key)`
- `hasDeepKey(obj, path)`
- `isPlainObject(val)`
- `getObjectSize(obj)`
- `freeze(obj)`
- `seal(obj)`
- `isFrozen(obj)`
- `isSealed(obj)`
- `objectIntersection(obj1, obj2)`
- `objectDifference(obj1, obj2)`
- `transformObjectKeys(obj, fn)`
- `transformObjectValues(obj, fn)`
- `queryStringToObject(str)`
- `objectToQueryString(obj)`
- `isSubset(obj1, obj2)`
- `deleteKey(obj, key)`
- `getTypeOfValue(val)`

### ✅ Array Utilities

- `unique(arr)`
- `flatten(arr, depth=1)`
- `chunk(arr, size)`
- `shuffle(arr)`
- `randomElement(arr)`
- `difference(arr1, arr2)`
- `intersection(arr1, arr2)`
- `union(arr1, arr2)`
- `zip(arr1, arr2)`
- `unzip(arr)`
- `partition(arr, fn)`
- `sortBy(arr, key, order='asc')`
- `moveElement(arr, fromIndex, toIndex)`
- `reverseArray(arr))`
- `rotateArray(arr, positions)`
- `deepFlatten(arr)`
- `first(arr, n=1)`
- `last(arr, n=1)`
- `compact(arr)`
- `sortNumbers(arr, order='asc')`
- `arrayToObject(arr, key)`
- `objectToArray(obj)`
- `range(start, end, step=1)`
- `sum(arr)`
- `average(arr)`
- `median(arr)`
- `mode(arr)`
- `isSorted(arr)`
- `everyNth(arr, n)`
- `findDuplicates(arr)`
- `uniqueObjects(arr, key)`




---

## 📂 Project Structure

```
my-utils-kit/
├── src/
│   ├── arrayUtils.ts
│   ├── objectUtils.ts
│   └── stringUtils.ts
├── dist/
│   └── compiled JS files
├── index.ts
└── package.json
```

---

## 🔧 Build

```bash
npm run build
```

Uses TypeScript to compile code to the `dist/` directory.

---

## 🧪 Test Locally

To test your package before publishing:

```bash
# From your package folder
npm link

# From your test project
npm link my-utils-kit
```

Then use it like a normal module:

```ts
import { camelCase } from 'my-utils-kit';
```

---

## 📜 License

MIT – feel free to use and contribute.

---

## 💡 Author

Made with ❤️ by Vinoth Madhavan
