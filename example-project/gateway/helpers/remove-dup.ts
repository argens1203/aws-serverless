export function removeDup(arr) {
    const map = {};
    arr.forEach(item => map[item] = "");
    return Object.keys(map);
}