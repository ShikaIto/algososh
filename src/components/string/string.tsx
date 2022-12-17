import React, { ChangeEvent, FormEvent } from "react";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { TCircle } from "../../types/types";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [letters, setLetters] = React.useState<TCircle[]>([]);

  const reverse = async (str: string) => {
    let arr: TCircle[] = [];
    str.split('').forEach(item => {
      arr.push({ value: item, state: ElementStates.Default })
    });

    setLetters([...arr]);

    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      if (start === end) {
        arr[start].state = ElementStates.Modified;
        setLetters([...arr]);
      }

      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setLetters([...arr]);

      await delay(DELAY_IN_MS);
      swap(arr, start, end);

      arr[start].state = ElementStates.Modified;
      arr[end].state = ElementStates.Modified;
      setLetters([...arr]);

      start++;
      end--;
    }

    setLoader(false);
    setValue('');
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    reverse(value);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          isLimitText={true}
          maxLength={11}
          onChange={onChange}
          disabled={loader}
          value={value}
          data-testid='input'
        />
        <Button type="submit" text={'Развернуть'} isLoader={loader} disabled={value ? false : true} />
      </form>
      {letters && <ul className={styles.list}>
        {letters.map((item, index) => {
          return (
            <li key={index}>
              <Circle letter={item.value} state={item.state} data-testid='circle' />
            </li>
          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
