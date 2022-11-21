import React, { FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from './stack-page.module.css';
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [disabledAdd, setDisabledAdd] = React.useState(true);
  const [disabledDelete, setDisabledDelete] = React.useState(true);
  const [value, setValue] = React.useState('');
  const [, update] = React.useState({});

  const stack = React.useRef(new Stack());

  const array = stack.current.getData();

  React.useEffect(() => {
    if (value.length > 0) {
      setDisabledAdd(false);
    }

    if (array.length > 0) {
      setDisabledDelete(false);
    }
  }, [value, array]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const addElement = async (item: string) => {
    setDisabledAdd(true);
    stack.current.push({ value: item, state: ElementStates.Changing });
    update({});

    await delay(SHORT_DELAY_IN_MS);

    setValue('');
    stack.current.changeState(array.length - 1, ElementStates.Default);
    update({});
  }

  const deleteElement = async () => {
    stack.current.changeState(array.length - 1, ElementStates.Changing);
    update({});

    await delay(SHORT_DELAY_IN_MS);

    stack.current.pop();
    update({});

    if (array.length < 1) {
      setDisabledDelete(true);
    }
  }

  const reset = () => {
    stack.current.reset();
    setDisabledDelete(true);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Введите значение" isLimitText={true} maxLength={4} onChange={onChange} value={value} />
        <Button text={'Добавить'} disabled={disabledAdd} onClick={() => addElement(value)} />
        <Button text={'Удалить'} disabled={disabledDelete} onClick={() => deleteElement()} />
        <Button text={'Очистить'} disabled={disabledDelete} extraClass={styles.margin} onClick={reset} />
      </form>
      {array && <ul className={styles.list}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={String(item.value)}
                index={index}
                head={index === array.length - 1 ? 'top' : ''}
                state={item.state}
              />
            </li>
          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
