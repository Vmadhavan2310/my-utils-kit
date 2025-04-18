export function deepCloneObj(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (Array.isArray(obj)) {
        return obj.map(deepCloneObj);
    }
    const clone = {};
    for (const key in obj) {
        clone[key] = deepCloneObj(obj[key]);
    }
    return clone;
}
export function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (source.hasOwnProperty(key) &&
            typeof source[key] === 'object' &&
            source[key] !== null &&
            !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        }
        else {
            result[key] = source[key];
        }
    }
    return result;
}
export function isEmpty(obj) {
    if (Array.isArray(obj))
        return false; // or throw error if not allowed
    return Object.keys(obj).length === 0;
}
export function pick(obj, keys) {
    const res = {};
    for (let key of keys) {
        res[key] = obj[key];
    }
    return res;
}
export function omit(obj, keys) {
    const res = { ...obj };
    for (let key of keys) {
        delete res[key];
    }
    return res;
}
export function flattenObject(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], newKey, result);
        }
        else {
            result[newKey] = obj[key];
        }
    }
    return result;
}
export function unflattenObject(obj) {
    const result = {};
    for (const key in obj) {
        const keys = key.split('.');
        let current = result;
        keys.forEach((k, index) => {
            if (index === keys.length - 1) {
                current[k] = obj[key];
            }
            else {
                if (!(k in current)) {
                    current[k] = {};
                }
                current = current[k];
            }
        });
    }
    return result;
}
export function invertObj(obj) {
    const res = {};
    for (const key in obj) {
        res[String(obj[key])] = key;
    }
    return res;
}
export function hasKey(obj, key) {
    return key in obj;
}
export function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}
export function setNestedValue(obj, path, value) {
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
export function deleteKey(obj, key) {
    const newObj = { ...obj };
    delete newObj[key];
    return newObj;
}
export function deepEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
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
export function getDeepObjectSize(obj) {
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
export function transformObjectKeys(obj, transformFn) {
    const result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = transformFn(key);
            result[newKey] = obj[key];
        }
    }
    return result;
}
export function transformObjectValues(obj, transformFn) {
    const result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = transformFn(obj[key]); // Apply transform export function to the value
        }
    }
    return result;
}
export function objectToQueryString(obj) {
    return new URLSearchParams(obj).toString();
}
export function queryStringToObject(queryString) {
    const params = new URLSearchParams(queryString);
    const result = {};
    const entries = params.entries();
    for (const [key, value] of entries) {
        result[key] = value;
    }
    return result;
}
export function deepFreeze(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    });
}
export function seal(obj) {
    Object.seal(obj);
}
export function deepSeal(obj) {
    Object.seal(obj);
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && typeof value === 'object') {
            deepSeal(value);
        }
    });
}
export function deepIsFrozen(obj) {
    if (!Object.isFrozen(obj))
        return false;
    // Check for nested objects
    return Object.keys(obj).every(key => {
        const value = obj[key];
        return !(value && typeof value === 'object') || deepIsFrozen(value);
    });
}
export function deepIsSealed(obj) {
    if (!Object.isSealed(obj))
        return false;
    // Check for nested objects
    return Object.keys(obj).every(key => {
        const value = obj[key];
        return !(value && typeof value === 'object') || deepIsSealed(value);
    });
}
export function hasDeepKey(obj, key) {
    if (key in obj)
        return true;
    for (const k in obj) {
        if (obj.hasOwnProperty(k) && typeof obj[k] === 'object' && obj[k] !== null) {
            if (hasDeepKey(obj[k], key)) {
                return true;
            }
        }
    }
    return false;
}
export function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
export class TypeUtils {
    static isNumber(value) {
        return typeof value === 'number';
    }
    static isString(value) {
        return typeof value === 'string';
    }
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    static isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }
    static isArray(value) {
        return Array.isArray(value);
    }
    static isFunction(value) {
        return typeof value === 'function';
    }
    static isNull(value) {
        return value === null;
    }
    static isUndefined(value) {
        return typeof value === 'undefined';
    }
    static isSymbol(value) {
        return typeof value === 'symbol';
    }
    static isPlainObject(value) {
        return value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype;
    }
    static isDate(value) {
        return Object.prototype.toString.call(value) === '[object Date]';
    }
    static isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }
    static isInstanceOf(value, constructor) {
        return value instanceof constructor;
    }
    static getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1); // Returns the internal class name (e.g., "Array", "Object", "Date")
    }
}
export function isSubset(obj1, obj2) {
    for (let key in obj1) {
        if (!(key in obj2) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
export function groupByKeys(arr, keys) {
    return arr.reduce((acc, obj) => {
        const groupKey = keys.map(key => obj[key]).join('|'); // Use a separator
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(obj);
        return acc;
    }, {});
}
export function arrayToObject(arr, key) {
    return arr.reduce((acc, obj) => {
        const keyValue = String(obj[key]);
        acc[keyValue] = obj;
        return acc;
    }, {});
}
export function getUniqueByKey(arr, key) {
    const seen = new Map();
    for (const item of arr) {
        const keyValue = String(item[key]);
        if (!seen.has(keyValue)) {
            seen.set(keyValue, item);
        }
    }
    return Array.from(seen.values());
}
export function shallowCopy(obj) {
    return { ...obj };
}
export function intersectObjects(obj1, obj2) {
    const result = {};
    for (const key in obj1) {
        if (obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
            result[key] = obj1[key];
        }
    }
    return result;
}
export function diffObjects(obj1, obj2) {
    const result = {};
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const key of allKeys) {
        if (obj1[key] !== obj2[key]) {
            result[key] = obj1[key] !== undefined ? obj1[key] : obj2[key];
        }
    }
    return result;
}
export function mapObjectValues(obj, callback) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = callback(obj[key], key, obj);
        }
    }
    return result;
}
