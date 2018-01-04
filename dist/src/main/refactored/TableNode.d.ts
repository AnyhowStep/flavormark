import { Node } from "../node";
export declare class TableNode extends Node {
    headers: string[];
    alignments: string[];
    rows: string[][];
    tbody: Tbody | null;
}
export declare class Tr extends Node {
}
export declare class Thead extends Node {
}
export declare class Th extends Node {
    alignment: string;
    string_content: string;
}
export declare class Tbody extends Node {
}
export declare class Td extends Node {
    alignment: string;
    string_content: string;
}
