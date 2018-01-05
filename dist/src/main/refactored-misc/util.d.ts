import { RegexStream } from "../RegexStream";
export declare function parseLinkTitle(parser: RegexStream): string | null;
export declare function parseLinkDestination(parser: RegexStream): string;
export declare function parseLinkLabel(parser: RegexStream): number;
import { RefMap } from "./RefMap";
export declare function parseReference(s: string | null, refmap: RefMap): number | undefined;
