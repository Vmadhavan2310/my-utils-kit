export function removeSortedDuplicates<T>(arr:T[]) {
    let left = 0;
    for(let right = 1; right < arr.length; right++) {
        if(arr[left] !== arr[right]) {
            arr[++left] = arr[right];
        }
    }
    return arr.slice(0,left + 1);
}

export function removeUnsortedDuplicates<T>(arr:T[]) {
    return [...new Set(arr)]
}

export function flattenArray<T>(arr:T[], depth = Infinity) {
    return arr.flat(depth);
}

  export function chunk<T>(arr:T[],size:number) {
    if(!arr) throw new Error('Input must be an array');
    if(size <= 0) throw new Error('chunk size must be greater than zero');

    let res:T[][] = [];

    for(let i=0; i<arr.length; i=i+size) {
        res.push(arr.slice(i,i+size));
    }

    return res;
}  

export function differences<T>(arr1: T[], arr2: T[]) {

    if(!arr1 || !arr2) throw new Error('Input must be an array');
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);
    let left:T[] = [];
    let right:T[] = [];

    let i = 0;
    let j = 0;
    while (i < arr1.length || j < arr2.length) {
        if (j < arr2.length && !set1.has(arr2[j])) {
            right.push(arr2[j]);
        }

        if (i < arr1.length && !set2.has(arr1[i])) {
            left.push(arr1[i]);
        }
        j++;
        i++;
    }
    return [...left, ...right];
}

export function intersection<T>(arr1: T[], arr2: T[]) {

    if(!arr1 || !arr2) throw new Error('Input must be an array');
    let set = new Set(arr2);
    let res:T[] = [];

    for(let i=0; i<arr1.length; i++) {
        if(set.has(arr1[i])) {
            res.push(arr1[i]);
            set.delete(arr1[i])
        }
    }
    return res;
}

export function union<T>(arr1: T[], arr2: T[]) {
    if(!arr1 || !arr2) throw new Error('Input must be an array');

    let mergedArr = [...arr1, ...arr2]
    return Array.from(new Set(mergedArr))
}

export function combineElementWise(arr1: number[], arr2: number[]): number[] {
    const result: number[] = [];
    for (let i = 0; i < arr1.length; i++) {
        result.push(arr1[i] + arr2[i]);
    }
    return result;
}

export function unzip<T, U>(arr: [T, U][]): [T[], U[]] {
    const firstArr = arr.map(pair => pair[0]); // Extract first elements
    const secondArr = arr.map(pair => pair[1]); // Extract second elements
    return [firstArr, secondArr];
}

export function partitionByCondition<T>(arr: T[], predicate: (value: T) => boolean): [T[], T[]] {
    const pass: T[] = [];
    const fail: T[] = [];
    for (const item of arr) {
        if (predicate(item)) {
            pass.push(item);
        } else {
            fail.push(item);
        }
    }
    return [pass, fail];
}

export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    return arr.sort((a, b) => {
        if (a[key] < b[key]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;  // If equal
    });
}

  export function countOccurencesArr<T>(arr: T[], char: T) {
    if(!arr) throw new Error('Input must be an array');
    let left = 0;
    let right = arr.length - 1;
    let count = 0;
  
    while (left <= right) {
      if (arr[left] === char) count++;
      if (arr[right] === char && left !== right) count++;
      left++;
      right--;
    }
  
    if (left === right && arr[left] === char) count++;
  
    return count;
  }

  export function removeFalsy<T>(arr: T[]) {
    if(!arr) throw new Error('Input must be an array');
    return arr.filter(item => Boolean(item))
}

export function move<T>(arr: T[], from: number, to: number): T[] {
    if (!Array.isArray(arr)) throw new Error("Input must be an array");
    if (from < 0 || from >= arr.length || to < 0 || to >= arr.length)
        throw new Error("Invalid from/to index");

    const element = arr[from];
    arr.splice(from, 1);
    arr.splice(to, 0, element);
    return arr;
}
export function reverseShallow<T>(arr: T[]): T[] {
    return [...arr].reverse(); 
}

export function reverseDeep<T>(arr: T[]): T[] {
    return JSON.parse(JSON.stringify([...arr])).reverse();
}

export function reverseRange<T>(arr:T[],start:number, end:number) {
    let newArr = [...arr]
    let reverseArr = newArr.slice(start,end+1).reverse();
    let deleteCount = end - start;
    newArr.splice(start,deleteCount+1,...reverseArr);
    return newArr;
}

export function reverseWithCondition<T>(arr: T[], condition: (value: T, index: number) => boolean): T[] {
    const result = [...arr];
    const indices = result
        .map((value, i) => condition(value, i) ? i : -1)
        .filter(i => i !== -1);

    let left = 0;
    let right = indices.length - 1;
    while (left < right) {
        const i = indices[left];
        const j = indices[right];
        [result[i], result[j]] = [result[j], result[i]];
        left++;
        right--;
    }

    return result;
}

export function rotate<T>(arr: T[], k: number): T[] {
    const len = arr.length;
    if (len === 0) return [];

    k = k % len;
    if (k < 0) k += len;

    return [...arr.slice(-k), ...arr.slice(0, -k)];
}

export function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
    return arr.map(item => item[key]);
}

export function fullyFlatten<T>(arr:T[]) {
    let res: T[] = [];

    for(let char of arr) {
        if(Array.isArray(char)) res.push(...fullyFlatten<T>(char))
        else res.push(char);
    }
    return res;
}

export function getFirst<T>(arr: T[], k: number = 1): T[] {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (k <= 0) throw new Error('Number must be a positive value');
    
    return arr.slice(0, k);
}

export function getLast<T>(arr: T[], k: number = 1): T[] {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (k <= 0) throw new Error('Number must be a positive value');
    
    return arr.slice(-k);
}

export const compact = removeFalsy;
  
export function arrayToObjects<T>(arr:[string, T][]) {
    const res: Record<string, T> = {};
 
     for (let [key, value] of arr) {
         res[key] = value;
     }
 
     return res;
 }


export function objectToArray<T>(obj:Record<string,T>) {

    let res: [string, T][] = [];

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) res.push([key, obj[key]])
    }
    return res;
}

export function range(start: number, end: number, step: number = 1): number[] {
    let result: number[] = [];
    for (let i = start; i <= end; i += step) {
        result.push(i);
    }
    return result;
}

export function sumArray<T extends number>(arr: T[]) {
    return arr.reduce((initial,val) => initial+val, 0)
}

export function getAverage<T extends number>(arr: T[]): number {
    if (arr.length === 0) throw new Error("Array cannot be empty");
    return Math.floor(arr.reduce((initial, val) => initial + val, 0) / arr.length);
}

export function getMedian<T extends number>(arr: T[]): number {
    if (arr.length === 0) throw new Error("Array cannot be empty");
    
    const sortedArr = [...arr].sort((a, b) => a - b);  // Sort the array
    const mid = Math.floor(sortedArr.length / 2);  // Find the middle index
    
    // If even length, return the average of the two middle elements
    if (sortedArr.length % 2 === 0) {
        return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    }
    
    // If odd length, return the middle element
    return sortedArr[mid];
}

export function getMode<T extends number>(arr: T[]) {
    if (arr.length === 0) throw new Error("Array cannot be empty");
    
    // Create a frequency map
    const frequencyMap: { [key: number]: number } = {};
    for (let num of arr) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // Find the maximum frequency
    const maxFrequency = Math.max(...Object.values(frequencyMap));
    
    // Return all numbers that have the maximum frequency
    return Object.keys(frequencyMap)
        .filter(key => frequencyMap[Number(key)] === maxFrequency)
        .map(key => Number(key));
}

export function isSorted<T extends number>(arr: T[], order: 'asc' | 'desc' = 'asc'): boolean {
    if (arr.length <= 1) return true;  // A single-element array or empty array is considered sorted
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (order === 'asc' && arr[i] > arr[i + 1]) {
            return false;  // If elements are not in ascending order
        }
        if (order === 'desc' && arr[i] < arr[i + 1]) {
            return false;  // If elements are not in descending order
        }
    }
    
    return true;  // Array is sorted in the specified order
}

export function getNthElements<T>(arr: T[], n: number): T[] {
    if (n <= 0) throw new Error("n must be a positive integer");
    return arr.filter((_, index) => index % n === n - 1);
}

export function findDuplicates<T>(arr: T[]): T[] {
    let seen = new Set<T>();
    let duplicates: T[] = [];
    
    for (let item of arr) {
        if (seen.has(item)) {
            duplicates.push(item);  // If already seen, add to duplicates
        } else {
            seen.add(item);  // Otherwise, add to seen set
        }
    }
    
    return duplicates;
}

export function removeObjectDuplicates<T>(arr: T[], key: keyof T): T[] {
    let seen = new Set<any>();  // Set to store unique values based on the key
    return arr.filter(item => {
        if (seen.has(item[key])) {
            return false;  // If we've already seen this value, exclude it
        } else {
            seen.add(item[key]);  // Add the value to the seen set
            return true;  // Keep the item
        }
    });
}

