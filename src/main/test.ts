export class T {

}
type X = {
    [k in keyof T] : T[k]
};
const x : X =  {
    test : 2
};
console.log(x);
