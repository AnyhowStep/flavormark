export function fromCodePoint (...codePoints : number[]) {
    try {
        return String.fromCodePoint(...codePoints);
    } catch (e) {
        if (e instanceof RangeError) {
            return String.fromCharCode(0xFFFD);
        }
        throw e;
    }
}
