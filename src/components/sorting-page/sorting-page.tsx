import React, { ChangeEvent, FormEvent } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SortingTypes } from "../../types/sorting-types";
import { delay, random, swap } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';

type TColumn = {
  value: number,
  state: ElementStates
}

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = React.useState({ ascending: false, descending: false });
  const [checked, setChecked] = React.useState({ selection: true, bubble: false });
  const [array, setArray] = React.useState<TColumn[]>([]);
  const [copyArray, setCopyArray] = React.useState<TColumn[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  const onChangeSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked({ selection: true, bubble: false });
    }
  }

  const onChangeBubble = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked({ selection: false, bubble: true });
    }
  }

  const randomArr = () => {
    let arr = [];
    let n = random(3, 17);

    for (let i = 0; i <= n; i++) {
      arr.push({ value: random(0, 100), state: ElementStates.Default })
    }

    setArray([...arr]);
    setCopyArray([...arr]);
  }

  const compare = (a: Number, b: number, type: SortingTypes) => {
    if (type === SortingTypes.Descending) {
      return a < b
    } else {
      return a > b
    }
  }

  const bubbleSort = async (arr: TColumn[], type: SortingTypes) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArray([...arr]);

        if (compare(arr[j].value, arr[j + 1].value, type)) {
          swap(arr, j, j + 1);
        }

        await delay(DELAY_IN_MS);

        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setArray([...arr]);
      }
      arr[arr.length - 1 - i].state = ElementStates.Modified;
    }
    setLoader({ ascending: false, descending: false });
  }

  const selectionSort = async (arr: TColumn[], type: SortingTypes) => {
    let min = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i].state = ElementStates.Changing;
      min = i;
      for (let j = i; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);

        if (compare(arr[min].value, arr[j].value, type)) {
          min = j;
        }

        await delay(DELAY_IN_MS);
        if (i !== j) {
          arr[j].state = ElementStates.Default;
        }
      }
      if (min !== i) {
        swap(arr, min, i);
      }
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setArray([...arr]);
    setLoader({ ascending: false, descending: false });
  }

  const handleClickAscending = () => {
    setLoader({ ascending: true, descending: false });
    setArray([...copyArray]);
    if (checked.selection) {
      selectionSort(array, SortingTypes.Ascending)
    } else {
      bubbleSort(array, SortingTypes.Ascending);
    }
  }

  const handleClickDescending = () => {
    setLoader({ ascending: false, descending: true });
    setArray([...copyArray]);
    if (checked.selection) {
      selectionSort(array, SortingTypes.Descending)
    } else {
      bubbleSort(array, SortingTypes.Descending);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.radio}>
          <RadioInput label="Выбор" name="sorting" defaultChecked onChange={onChangeSelection} />
          <RadioInput label="Пузырёк" name="sorting" onChange={onChangeBubble} />
        </div>
        <div className={styles.buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={loader.ascending}
            onClick={handleClickAscending}
            disabled={loader.descending}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={loader.descending}
            onClick={handleClickDescending}
            disabled={loader.ascending}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={randomArr}
          disabled={loader.ascending || loader.descending ? true : false}
        />
      </form>

      {array && <ul className={styles.list}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Column index={item.value} state={item.state} />
            </li>
          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
