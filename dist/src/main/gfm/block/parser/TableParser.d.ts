import { Parser } from "./../../../Parser";
import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { TableNode } from "./../node/TableNode";
import { Node } from "./../../../Node";
import { TbodyParser } from "./TbodyParser";
import { TdParser } from "./TdParser";
import { TheadParser } from "./TheadParser";
import { ThParser } from "./ThParser";
import { TrParser } from "./TrParser";
export interface TableParserArgs {
    tbodyParser: TbodyParser;
    tdParser: TdParser;
    theadParser: TheadParser;
    thParser: ThParser;
    trParser: TrParser;
}
export declare class TableParser extends BlockParser<TableNode> {
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    acceptLazyContinuation: boolean;
    private args;
    constructor(args: TableParserArgs, nodeType?: string, nodeCtor?: BlockNodeCtor<TableNode>);
    tryStart(parser: Parser, container: Node): boolean;
    continue(_parser: Parser, _node: TableNode): boolean;
    lazyContinue(parser: Parser, node: TableNode): void;
    finalize(_parser: Parser, _node: TableNode): void;
    canContain(): boolean;
}
