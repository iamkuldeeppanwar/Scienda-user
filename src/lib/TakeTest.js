
export function convertToTwoDigits(num) {
    if (Math.floor(num/10) === 0) {
        return '0' + String(num);
    }
    return num;
}