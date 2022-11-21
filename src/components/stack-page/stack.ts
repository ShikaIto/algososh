import { ElementStates } from "../../types/element-states"
import { TCircle } from "../../types/types"


interface IStack<T> {
    push: (item: T) => void,
    pop: () => void,
    reset: () => void
}

export class Stack implements IStack<TCircle> {
    private array: TCircle[] = [];

    push(item: TCircle) {
        this.array.push(item);
    }

    pop() {
        this.array.pop();
    }

    reset() {
        this.array = [];
    }

    changeState(index: number, state: ElementStates) {
        this.array[index].state = state;
    }

    getData() {
        return this.array
    }
}