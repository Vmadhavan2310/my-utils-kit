export function camelCase(str) {
    let res = [];
    let capitalizeNext = false;
    for (let char of str.trim()) {
        if (/\s+/g.test(char))
            capitalizeNext = true;
        else {
            res.push(capitalizeNext ? char.toUpperCase() : char.toLowerCase());
            capitalizeNext = false;
        }
    }
    return res.join("");
}
export function toSeperatedLowerCase(str, seperator) {
    let res = [];
    let wasSpace = false;
    for (let char of str.trim()) {
        if (/\s+/g.test(char)) {
            if (!wasSpace) {
                res.push(seperator);
                wasSpace = true;
            }
        }
        else {
            res.push(char.toLowerCase());
            wasSpace = false;
        }
    }
    return res.join("");
}
export function kebabCase(str) {
    return toSeperatedLowerCase(str, "-");
}
export function snakeCase(str) {
    return toSeperatedLowerCase(str, "_");
}
export function pascalCase(str) {
    let res = [];
    let Capitalize = true;
    for (let char of str.trim()) {
        if (/\s+/g.test(char))
            Capitalize = true;
        else {
            res.push(Capitalize ? char.toUpperCase() : char.toLowerCase());
            Capitalize = false;
        }
    }
    return res.join("");
}
export function titleCase(str) {
    let res = [];
    let wasSpace = true;
    for (let char of str.trim()) {
        if (/\s+/g.test(char)) {
            res.push(char);
            wasSpace = true;
        }
        else {
            res.push(wasSpace ? char.toUpperCase() : char.toLowerCase());
            wasSpace = false;
        }
    }
    return res.join("");
}
export function truncate(str, length, suffix = "...") {
    if (str.length <= length)
        return str;
    let res = str.slice(0, length);
    return res.endsWith(" ") ? res.trimEnd() + suffix : res + suffix;
}
export function reverseStr(str) {
    return str.split("").reverse().join("");
}
export function reverseWords(str) {
    return str
        .split(" ")
        .map((word) => word.split("").reverse().join(""))
        .join(" ");
}
export function capitalize(str) {
    if (!str)
        return "";
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
export function unCapitalize(str) {
    if (!str)
        return "";
    return str[0].toLowerCase() + str.slice(1).toLowerCase();
}
export function padStart(str, length, char) {
    if (!str)
        throw new Error("string cannot be empty");
    if (str.length >= length)
        return str;
    let complement = length - str.length;
    return char.repeat(complement) + str;
}
export function padEnd(str, length, char) {
    if (!str)
        throw new Error("string cannot be empty");
    if (str.length >= length)
        return str;
    let complement = length - str.length;
    return str + char.repeat(complement);
}
export function isPalidrome(str) {
    str = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
    let left = 0;
    let right = str.length - 1;
    while (left <= right) {
        if (str[left] !== str[right])
            return false;
        left++;
        right--;
    }
    return true;
}
export function countOccurences(str, char) {
    if (!str)
        throw new Error("String cannot be empty");
    let left = 0;
    let right = str.length - 1;
    let count = 0;
    while (left <= right) {
        if (str[left++] === char)
            count++;
        if (str[right--] === char)
            count++;
    }
    if (left === right && str[left] === char)
        count++;
    return count;
}
export function removeSpaces(str) {
    return str.replace(/\s+/g, "");
}
export function removeSpecialChar(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "");
}
export function escapeHTML(str) {
    if (typeof str !== "string")
        return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
export function unescapeHTML(str) {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}
export function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}
export function maskString(str, visibleCount = 4, maskChar = "*") {
    if (visibleCount >= str.length)
        return str;
    let maskedLen = str.length - visibleCount;
    let maskedChar = maskChar.repeat(maskedLen);
    return maskedChar + str.slice(-visibleCount);
}
export function stripHTML(str) {
    return str.replace(/<[^>]*>/g, "");
}
export function removeDuplicate(str) {
    return [...new Set(str)].join("");
}
export function toTitleCase(str) {
    const smallWords = [
        "a",
        "an",
        "and",
        "but",
        "for",
        "nor",
        "of",
        "on",
        "or",
        "so",
        "the",
        "to",
        "up",
        "yet",
    ];
    return str
        .toLowerCase()
        .split(" ")
        .map((word, index) => {
        if (smallWords.includes(word) &&
            index !== 0 &&
            index !== str.split(" ").length - 1) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
        .join(" ");
}
export function isAnagrams(str1, str2) {
    const cleanStr1 = str1.replace(/\s+/g, "").toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, "").toLowerCase();
    return (cleanStr1.split("").sort().join("") === cleanStr2.split("").sort().join(""));
}
export function findLongestWord(str) {
    return str
        .split(" ")
        .reduce((longest, current) => current.length > longest.length ? current : longest, "");
}
export function countWords(str) {
    return str.trim().split(/\s+/).length;
}
export function swapCase(str) {
    return str
        .split("")
        .map((char) => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
        .join("");
}
export function randomString(len) {
    const res = [];
    while (res.length < len) {
        const charCode = Math.floor(Math.random() * (122 - 65 + 1)) + 65;
        const char = String.fromCharCode(charCode);
        if (/[a-zA-Z]/.test(char)) {
            res.push(char);
        }
    }
    return res.join("");
}
export function toAscii(char) {
    return char.charCodeAt(0);
}
export function fromAscii(code) {
    return String.fromCharCode(code);
}
export function toHex(char) {
    return char.charCodeAt(0).toString(16);
}
export function toBase64Unicode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}
export function fromBase64Unicode(base64) {
    return decodeURIComponent(escape(atob(base64)));
}
