import { Parser } from "../blocks";
import { BlockParser } from "./BlockParser";
import { TableNode, Tr, Th, Td, Thead, Tbody } from "./TableNode";
import { Node } from "../node";
export declare class TableParser extends BlockParser<TableNode> {
    tryStart: (parser: Parser, container: Node) => boolean;
    continue: (_parser: Parser, _node: TableNode) => boolean;
    lazyContinue: (parser: Parser, node: TableNode) => boolean;
    finalize: (_parser: Parser, _node: TableNode) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    acceptLazyContinuation: boolean;
}
export declare const tableParser: TableParser;
export declare class ThParser extends BlockParser<Th> {
    constructor();
    getString(node: Th): string;
    parseInlines: boolean;
}
export declare class TdParser extends BlockParser<Td> {
    constructor();
    getString(node: Td): string;
    parseInlines: boolean;
}
export declare class TrParser extends BlockParser<Tr> {
    constructor();
}
export declare class TheadParser extends BlockParser<Thead> {
    constructor();
}
export declare class TbodyParser extends BlockParser<Tbody> {
    constructor();
    continue: (_parser: Parser, _node: Tbody) => boolean;
}
