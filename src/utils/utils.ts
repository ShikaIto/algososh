import { TColumn } from "../types/types";
import { SortingTypes } from "../types/sorting-types";
import { ElementStates } from "../types/element-states";

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const swap = (arr: any[], a: number, b: number) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

export const compare = (a: Number, b: number, type: SortingTypes) => {
    if (type === SortingTypes.Descending) {
        return a < b
    } else {
        return a > b
    }
}

export function* generateBubbleSort(arr: TColumn[], type: SortingTypes): Generator<TColumn[]> {
    if (arr.length < 1) {
        return []
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            yield ([...arr]);

            if (compare(arr[j].value, arr[j + 1].value, type)) {
                swap(arr, j, j + 1);
            }

            arr[j].state = ElementStates.Default;
            arr[j + 1].state = ElementStates.Default;
        }
        arr[arr.length - 1 - i].state = ElementStates.Modified;
    }

    return [...arr];
}

export function* generateSelectionSort(arr: TColumn[], type: SortingTypes): Generator<TColumn[]> {
    if (arr.length < 1) {
        return []
    }

    let min = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i].state = ElementStates.Changing;
        min = i;
        for (let j = i; j < arr.length; j++) {
            arr[j].state = ElementStates.Changing;
            yield ([...arr]);

            if (compare(arr[min].value, arr[j].value, type)) {
                min = j;
            }

            if (i !== j) {
                arr[j].state = ElementStates.Default;
            }
            yield ([...arr]);
        }
        if (min !== i) {
            swap(arr, min, i);
        }
        arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    return [...arr];
}