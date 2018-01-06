import {Node} from "../Node";

export class TableNode extends Node {
    public headers : string[] = [];
    public alignments : string[] = [];
    public rows : string[][] = [];

    public tbody : Tbody|undefined = undefined;
}

export class Tr extends Node {
}

export class Thead extends Node {

}

export class Th extends Node {
    public alignment : string = "left";
    public string_content : string = "";
}

export class Tbody extends Node {

}

export class Td extends Node {
    public alignment : string = "left";
    public string_content : string = "";
}
