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