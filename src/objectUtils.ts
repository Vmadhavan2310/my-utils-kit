export function deepCloneObj<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(deepCloneObj) as unknown as T;
    }

    const clone: any = {};
    for (const key in obj) {
        clone[key] = deepCloneObj((obj as any)[key]);
    }
    return clone;
}

export function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(target: T, source: U): T & U {
    const result: any = { ...target };

    for (const key in source) {
        if (
            source.hasOwnProperty(key) &&
            typeof source[key] === 'object' &&
            source[key] !== null &&
            !Array.isArray(source[key])
        ) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

export function isEmpty<T extends object>(obj: T): boolean {
    if (Array.isArray(obj)) return false; // or throw error if not allowed
    return Object.keys(obj).length === 0;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const res = {} as Pick<T, K>;

    for (let key of keys) {
        res[key] = obj[key];
    }

    return res;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const res = { ...obj };

    for (let key of keys) {
        delete res[key];
    }

    return res;
}

export function flattenObject(obj: Record<string, any>, parentKey = '', result: Record<string, any> = {}): Record<string, any> {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
  
      const newKey = parentKey ? `${parentKey}.${key}` : key;
  
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  
    return result;
  }

  export function unflattenObject(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
  
    for (const key in obj) {
      const keys = key.split('.');
      let current = result;
  
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = obj[key];
        } else {
          if (!(k in current)) {
            current[k] = {};
          }
          current = current[k];
        }
      });
    }
  
    return result;
  }

  export function invertObj<T extends Record<string, string | number | symbol>>(obj: T): Record<string, keyof T> {
    const res: Record<string, keyof T> = {};
  
    for (const key in obj) {
      res[String(obj[key])] = key;
    }
  
    return res;
  }

  export function hasKey(obj: Record<string, any>, key: string): boolean {
    return key in obj;
}


export function getNestedValue<T>(obj: Record<string, any>, path: string) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function setNestedValue<T>(obj: Record<string, any>, path: string, value: T): boolean {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // If the key doesn't exist or is not an object, create an empty object for it
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }

        current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;

    return true;
}

export function deleteKey<T>(obj: Record<string, T>, key: string): Record<string, T> {
    const newObj = { ...obj }; 
    delete newObj[key];
    return newObj;
}

export function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }

        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

export function getDeepObjectSize(obj: Record<string, any>): number {
    let size = 0;

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                size += getDeepObjectSize(obj[key]); 
            }
        }
    }
    return size;
}

export function transformObjectKeys<T>(obj: Record<string, T>, transformFn: (key: string) => string): Record<string, T> {
    const result: Record<string, T> = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = transformFn(key);
            result[newKey] = obj[key];
        }
    }

    return result;
}

export function transformObjectValues<T>(
    obj: Record<string, T>,
    transformFn: (value: T) => T
): Record<string, T> {
    const result: Record<string, T> = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = transformFn(obj[key]); // Apply transform export function to the value
        }
    }

    return result;
}

export function objectToQueryString(obj: Record<string, any>): string {
    return new URLSearchParams(obj).toString();
}

export function queryStringToObject(queryString: string): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    const entries = (params as any).entries() as Iterable<[string, string]>;
    for (const [key, value] of entries) {
        result[key] = value;
    }

    return result;
}

export function deepFreeze(obj: Record<string, any>): void {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    });
}

export function seal(obj: Record<string, any>): void {
    Object.seal(obj);
}


export function deepSeal(obj: Record<string, any>): void {
    Object.seal(obj);
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object') {
            deepSeal(value);
        }
    });
}

export function deepIsFrozen(obj: Record<string, any>): boolean {
    if (!Object.isFrozen(obj)) return false;

    // Check for nested objects
    return Object.keys(obj).every(key => {
        const value = obj[key];
        return !(value && typeof value === 'object') || deepIsFrozen(value);
    });
}


export function deepIsSealed(obj: Record<string, any>): boolean {
    if (!Object.isSealed(obj)) return false;

    // Check for nested objects
    return Object.keys(obj).every(key => {
        const value = obj[key];
        return !(value && typeof value === 'object') || deepIsSealed(value);
    });
}

export function hasDeepKey(obj: Record<string, any>, key: string): boolean {
    if (key in obj) return true;

    for (const k in obj) {
        if (obj.hasOwnProperty(k) && typeof obj[k] === 'object' && obj[k] !== null) {
            if (hasDeepKey(obj[k], key)) {
                return true;
            }
        }
    }

    return false;
}

export function isPlainObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]';
}


export class TypeUtils {
    static isNumber(value: any): boolean {
        return typeof value === 'number';
    }

    static isString(value: any): boolean {
        return typeof value === 'string';
    }

    static isBoolean(value: any): boolean {
        return typeof value === 'boolean';
    }

    static isObject(value: any): boolean {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    static isArray(value: any): boolean {
        return Array.isArray(value);
    }

    static isFunction(value: any): boolean {
        return typeof value === 'function';
    }

    static isNull(value: any): boolean {
        return value === null;
    }

    static isUndefined(value: any): boolean {
        return typeof value === 'undefined';
    }

    static isSymbol(value: any): boolean {
        return typeof value === 'symbol';
    }

    static isPlainObject(value: any): boolean {
        return value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype;
    }

    static isDate(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Date]';
    }

    static isRegExp(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }

    static isInstanceOf(value: any, constructor: Function): boolean {
        return value instanceof constructor;
    }

    static getType(value: any): string {
        return Object.prototype.toString.call(value).slice(8, -1); // Returns the internal class name (e.g., "Array", "Object", "Date")
    }
}


export function isSubset<T>(obj1: Record<string, T>, obj2: Record<string, T>): boolean {
    for (let key in obj1) {
        if (!(key in obj2) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

export function groupByKeys<T>(arr: T[], keys: (keyof T)[]): Record<string, T[]> {
    return arr.reduce((acc, obj) => {
        const groupKey = keys.map(key => obj[key]).join('|'); // Use a separator
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(obj);
        return acc;
    }, {} as Record<string, T[]>);
}

export function arrayToObject<T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> {
    return arr.reduce((acc, obj) => {
        const keyValue = String(obj[key]);
        acc[keyValue] = obj;
        return acc;
    }, {} as Record<string, T>);
}


export function getUniqueByKey<T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T[] {
    const seen = new Map<string, T>();
    for (const item of arr) {
        const keyValue = String(item[key]);
        if (!seen.has(keyValue)) {
            seen.set(keyValue, item);
        }
    }
    return Array.from(seen.values());
}


export function shallowCopy<T extends object>(obj: T): T {
    return { ...obj };
}

export function intersectObjects<T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj1) {
        if (obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
            result[key] = obj1[key];
        }
    }
    return result;
}

export function diffObjects<T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> {
    const result: Partial<any> = {};
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    
    for (const key of allKeys) {
        if (obj1[key] !== obj2[key]) {
            result[key] = obj1[key] !== undefined ? obj1[key] : obj2[key];
        }
    }

    return result;
}

export function mapObjectValues<T, U>(
    obj: Record<string, T>,
    callback: (value: T, key: string, obj: Record<string, T>) => U
  ): Record<string, U> {
    const result: Record<string, U> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = callback(obj[key], key, obj);
      }
    }
    return result;
  }
  

