import { Node } from "./../../../Node";
import { TbodyNode } from "./TbodyNode";
export declare class TableNode extends Node {
    headers: string[];
    alignments: string[];
    rows: string[][];
    tbody: TbodyNode | undefined;
}
