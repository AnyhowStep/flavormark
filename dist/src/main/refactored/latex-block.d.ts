import { BlockParser } from "./BlockParser";
import { Parser } from "../Parser";
import { Node } from "../node";
import { LatexBlockNode } from "./LatexBlockNode";
export declare class LatexBlockParser extends BlockParser<LatexBlockNode> {
    tryStart: (parser: Parser) => boolean;
    continue: (parser: Parser, container: LatexBlockNode) => boolean;
    finalize: (_parser: Parser, block: LatexBlockNode) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd: boolean;
    ignoreLastLineBlank: (_parser: Parser, _container: Node) => boolean;
    isLeaf: boolean;
    appendString(node: LatexBlockNode, str: string): void;
    getString(node: LatexBlockNode): string;
    unsetString(node: LatexBlockNode): void;
}
export declare const latexBlockParser: LatexBlockParser;
