export declare const ENTITY = "&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});";
export declare const OPENTAG: string;
export declare const CLOSETAG: string;
export declare const reHtmlTag: RegExp;
export declare const ESCAPABLE = "[!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]";
export declare const unescapeString: (s: string) => string;
export declare const normalizeURI: (uri: string) => string;
export declare const escapeXml: (s: string, preserve_entities?: boolean | undefined) => string;
