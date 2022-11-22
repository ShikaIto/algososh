import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/types";

class Node {
    element: TCircle;
    next: Node | null;

    constructor(item: TCircle, next: Node | null = null) {
        this.element = item;
        this.next = next;
    }
}

export class LinkedList {
    array: Node[] = [];
    head: Node | null = null;
    tail: Node | null = null;

    constructor(items: TCircle[]) {
        items.forEach(item => {
            this.append(item);
        });
    }

    append(item: TCircle) {
        const node = new Node(item);
        this.array.push(node);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    prepend(item: TCircle) {
        const node = new Node(item);
        this.array.unshift(node);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }

    addByIndex(index: number, item: TCircle) {
        const node = new Node(item);
        if (this.array[index] === this.head) {
            node.next = this.head;
            this.head = node;
        }

        this.array.splice(index, 0, node);
    }

    deleteHead() {
        if (!this.head || this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.array = [];
        } else {
            this.head = this.head?.next;
            this.array.shift();
        }
    }

    deleteTail() {
        if (!this.head || this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.array = [];
        } else {
            let current = this.head;
            while (current.next) {
                if (!current.next.next) {
                    current.next = null;
                } else {
                    current = current.next;
                }
            }
            this.tail = current;
            this.array.pop();
        }
    }

    deleteByIndex(index: number) {
        if (!this.head || this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.array = [];
            return;
        }

        if (this.array[index] === this.head) {
            this.deleteHead();
        } else if (this.array[index] === this.tail) {
            this.deleteTail();
        } else {
            this.array.splice(index, 1);
        }
    }

    changeState(index: number, state: ElementStates) {
        this.array[index].element.state = state;
    }

    changeValue(index: number, value: string = '') {
        this.array[index].element.value = value;
    }

    getData() {
        const array = this.array;
        const tail = this.tail;
        const head = this.head;
        return { array, tail, head }
    }
}
