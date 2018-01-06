import { Parser } from "../Parser";
import { BlockParser } from "../BlockParser";
import { TableNode, Tr, Th, Td, Thead, Tbody } from "./TableNode";
import { Node } from "../Node";
export declare class TableParser extends BlockParser<TableNode> {
    tryStart(parser: Parser, container: Node): boolean;
    continue(_parser: Parser, _node: TableNode): boolean;
    lazyContinue(parser: Parser, node: TableNode): void;
    finalize(_parser: Parser, _node: TableNode): void;
    canContain(): boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    acceptLazyContinuation: boolean;
}
export declare const tableParser: TableParser;
export declare class ThParser extends BlockParser<Th> {
    constructor();
    getString(node: Th): string;
    continue(_parser: Parser, _node: Tbody): boolean;
    finalize(): void;
    canContain(): boolean;
    parseInlines: boolean;
}
export declare class TdParser extends BlockParser<Td> {
    constructor();
    getString(node: Td): string;
    continue(_parser: Parser, _node: Tbody): boolean;
    finalize(): void;
    canContain(): boolean;
    parseInlines: boolean;
}
export declare class TrParser extends BlockParser<Tr> {
    constructor();
    continue(_parser: Parser, _node: Tbody): boolean;
    finalize(): void;
    canContain(): boolean;
}
export declare class TheadParser extends BlockParser<Thead> {
    constructor();
    continue(_parser: Parser, _node: Tbody): boolean;
    finalize(): void;
    canContain(): boolean;
}
export declare class TbodyParser extends BlockParser<Tbody> {
    constructor();
    continue(_parser: Parser, _node: Tbody): boolean;
    finalize(): void;
    canContain(): boolean;
}
