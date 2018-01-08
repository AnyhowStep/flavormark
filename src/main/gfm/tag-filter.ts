export const tagFilter = /\<(\s*)(title|textarea|style|xmp|iframe|noembed|noframes|script|plaintext)(\s*)(\>)/gi;
export function filterTag (raw : string) : string {
    return raw.replace(
        tagFilter,
        "&lt;$1$2$3$4"
    );
}
