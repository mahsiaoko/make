let _items = Symbol();   // 作为属性存在，以属性构建了一个栈

class Stack2 {

    constructor () {
        this[_items] = [];
    }

    push(element){
        this[_items].push(element);
    }

    pop(){
        return this[_items].pop();
    }

    peek(){
        return this[_items][this[_items].length-1];
    }

    isEmpty(){
        return this[_items].length == 0;
    }

    size(){
        return this[_items].length;
    }

    clear(){
        this[_items] = [];
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        return this[_items].toString();
    }
}
let stack = new Stack2();
stack.push(1);
stack.push(2);
stack.print();
console.log(stack.toString());
let objectSymbols = Object.getOwnPropertySymbols(stack)
console.log(objectSymbols.length);
console.log(objectSymbols);