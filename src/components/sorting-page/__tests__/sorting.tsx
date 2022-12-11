import { ElementStates } from "../../../types/element-states";
import { SortingTypes } from "../../../types/sorting-types";
import { TColumn } from "../../../types/types";
import { generateBubbleSort, generateSelectionSort } from "../../../utils/utils";


describe('sorting tests', () => {
    const array: TColumn[] = [];
    const arrayWithElement = [{ value: 1, state: ElementStates.Default }];
    const resultElement = [{ value: 1, state: ElementStates.Modified }];
    const arrayWithElements = [
        { value: 1, state: ElementStates.Default },
        { value: 4, state: ElementStates.Default },
        { value: 3, state: ElementStates.Default },
        { value: 2, state: ElementStates.Default }
    ];
    const resultAsceding = [
        { value: 1, state: ElementStates.Modified },
        { value: 2, state: ElementStates.Modified },
        { value: 3, state: ElementStates.Modified },
        { value: 4, state: ElementStates.Modified }
    ];
    const resultDesceding = [
        { value: 4, state: ElementStates.Modified },
        { value: 3, state: ElementStates.Modified },
        { value: 2, state: ElementStates.Modified },
        { value: 1, state: ElementStates.Modified }
    ];

    const sortingTest = (
        arr: TColumn[],
        resultArrAscending: TColumn[],
        resultArrDescending: TColumn[],
        generator: typeof generateSelectionSort | typeof generateBubbleSort
    ) => {
        const generatorAscending = generator(arr, SortingTypes.Ascending);
        let resultAsceding = generatorAscending.next();

        while (!resultAsceding.done) {
            resultAsceding = generatorAscending.next();
        }

        expect(resultAsceding.value).toEqual(resultArrAscending);

        const generatorDescending = generator(arr, SortingTypes.Descending);
        let resultDesceding = generatorDescending.next();
        while (!resultDesceding.done) {
            resultDesceding = generatorDescending.next();
        }

        expect(resultDesceding.value).toEqual(resultArrDescending);
    }


    it('with an empty array', () => {
        sortingTest(array, array, array, generateBubbleSort);
        sortingTest(array, array, array, generateSelectionSort);
    })

    it('array with element', () => {
        sortingTest(arrayWithElement, resultElement, resultElement, generateBubbleSort);
        sortingTest(arrayWithElement, resultElement, resultElement, generateSelectionSort);
    })

    it('array with elements', () => {
        sortingTest(arrayWithElements, resultAsceding, resultDesceding, generateBubbleSort);
        sortingTest(arrayWithElements, resultAsceding, resultDesceding, generateSelectionSort);
    })
})