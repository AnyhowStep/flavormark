import {Node} from "./../../../Node";
import {TbodyNode} from "./TbodyNode";

export class TableNode extends Node {
    public headers : string[] = [];
    public alignments : string[] = [];
    public rows : string[][] = [];

    public tbody : TbodyNode|undefined = undefined;
}
