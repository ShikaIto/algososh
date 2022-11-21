import { ElementStates } from "../../types/element-states"
import { TCircle } from "../../types/types"


interface IQueue<T> {
    enqueue: (item: T) => void,
    dequeue: () => void,
    reset: () => void
}

export class Queue implements IQueue<TCircle> {
    private array: TCircle[] = [];
    private head: null | number = null;
    private tail: null | number = null;
    private length: number;

    constructor(length: number) {
        this.length = length;
        this.array = Array(this.length).fill({ value: '', state: ElementStates.Default });
    }

    enqueue(item: TCircle) {
        if (this.array[this.tail !== null && this.tail < 6 ? this.tail + 1 : 0].value === '') {
            this.array[this.tail !== null && this.tail < 6 ? this.tail + 1 : 0] = item;
            this.tail = this.tail !== null && this.tail < 6 ? this.tail + 1 : 0;
            this.head = this.head !== null ? this.head : 0;
        }
    }

    dequeue() {
        if (this.head !== null) {
            this.array[this.head] = { value: '', state: ElementStates.Default };

            if ((this.head === 6 && this.array[0].value === '') || this.head < 6 && this.array[this.head + 1].value === '') {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head === 6 ? 0 : this.head + 1;
            }
        }
    }

    reset() {
        this.array = this.array.fill({ value: '', state: ElementStates.Default });
        this.head = null;
        this.tail = null;
    }

    changeState(index: number, state: ElementStates) {
        this.array[index].state = state;
    }

    getData() {
        const array = this.array;
        const tail = this.tail;
        const head = this.head;
        return { array, tail, head }
    }
}