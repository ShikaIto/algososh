import React, { ChangeEvent, FormEvent } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SortingTypes } from "../../types/sorting-types";
import { delay, generateSelectionSort, random, generateBubbleSort } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { TColumn } from "../../types/types";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = React.useState({ ascending: false, descending: false });
  const [checked, setChecked] = React.useState({ selection: true, bubble: false });
  const [array, setArray] = React.useState<TColumn[]>([]);
  const [copyArray, setCopyArray] = React.useState<TColumn[]>([]);

  const randomArr = () => {
    let arr = [];
    let n = random(3, 17);

    for (let i = 0; i <= n; i++) {
      arr.push({ value: random(0, 100), state: ElementStates.Default })
    }

    setArray([...arr]);
    setCopyArray([...arr]);
  }

  React.useEffect(() => {
    randomArr();
  }, []);

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

  const bubbleSort = async (arr: TColumn[], type: SortingTypes) => {
    const generator = generateBubbleSort(arr, type);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setArray(generator.next().value);
        await delay(DELAY_IN_MS);
      }
    }
    setArray(generator.next().value);
    setLoader({ ascending: false, descending: false });
  }

  const selectionSort = async (arr: TColumn[], type: SortingTypes) => {
    const generator = generateSelectionSort(arr, type);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i; j < arr.length; j++) {
        setArray(generator.next().value);
        await delay(DELAY_IN_MS);
        setArray(generator.next().value);
      }
    }
    setArray(generator.next().value);
    setLoader({ ascending: false, descending: false });
  }

  const handleClickAscending = () => {
    setLoader({ ascending: true, descending: false });
    if (checked.selection) {
      selectionSort(copyArray, SortingTypes.Ascending)
    } else {
      bubbleSort(copyArray, SortingTypes.Ascending);
    }
  }

  const handleClickDescending = () => {
    setLoader({ ascending: false, descending: true });
    if (checked.selection) {
      selectionSort(copyArray, SortingTypes.Descending)
    } else {
      bubbleSort(copyArray, SortingTypes.Descending);
    }
  }

  return (
    <SolutionLayout title="???????????????????? ??????????????">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.radio}>
          <RadioInput label="??????????" name="sorting" defaultChecked onChange={onChangeSelection} />
          <RadioInput label="??????????????" name="sorting" onChange={onChangeBubble} />
        </div>
        <div className={styles.buttons}>
          <Button
            text="???? ??????????????????????"
            sorting={Direction.Ascending}
            isLoader={loader.ascending}
            onClick={handleClickAscending}
            disabled={loader.descending}
          />
          <Button
            text="???? ????????????????"
            sorting={Direction.Descending}
            isLoader={loader.descending}
            onClick={handleClickDescending}
            disabled={loader.ascending}
          />
        </div>
        <Button
          text="?????????? ????????????"
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
