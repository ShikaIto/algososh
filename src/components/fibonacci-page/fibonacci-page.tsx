import React, { FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './fibonacci-page.module.css';
import { delay } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [loader, setLoader] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState<number[]>([]);

  const fibonacci = async (n: number) => {
    let arr: number[] = [1];
    setResult([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.push(1);
    setResult([...arr]);

    for (let i = 2; i < n + 1; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arr.push(arr[i - 2] + arr[i - 1]);
      setResult([...arr]);
    }

    setLoader(false);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    fibonacci(Number(value));
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Введите значение" type="number" isLimitText={true} min={1} max={19} onChange={onChange} disabled={loader} />
        <Button type="submit" text={'Рассчитать'} isLoader={loader} />
      </form>
      {result && <ul className={styles.list}>
        {result.map((item, index) => {
          return (
            <li key={index}>
              <Circle letter={String(item)} index={index} />
            </li>
          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
