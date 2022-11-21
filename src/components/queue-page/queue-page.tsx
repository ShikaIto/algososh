import React, { FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import styles from './queue-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const [disabledAdd, setDisabledAdd] = React.useState(true);
  const [disabledDelete, setDisabledDelete] = React.useState(true);
  const [value, setValue] = React.useState('');
  const [, update] = React.useState({});

  const queue = React.useRef(new Queue(7));

  const data = queue.current.getData();

  React.useEffect(() => {
    if (value.length > 0) {
      setDisabledAdd(false);
    }

    if (data.array[data.tail !== null && data.tail < 6 ? data.tail + 1 : 0].value === '') {
      setDisabledDelete(false);
    }
  }, [value, data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const addElement = async (item: string) => {
    queue.current.enqueue({ value: item, state: ElementStates.Changing });
    update({});

    await delay(SHORT_DELAY_IN_MS);
    queue.current.changeState(data.tail !== null && data.tail < 6 ? data.tail + 1 : 0, ElementStates.Default);
    setValue('');
    setDisabledAdd(true);
  }


  const deleteElement = async () => {
    queue.current.changeState(data.head !== null ? data.head : 0, ElementStates.Changing);
    update({});

    await delay(SHORT_DELAY_IN_MS);

    queue.current.dequeue();
    update({});

    if (data.head === null) {
      setDisabledDelete(true);
    }
  }

  const reset = () => {
    queue.current.reset();
    setDisabledDelete(true);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Введите значение" isLimitText={true} maxLength={4} onChange={onChange} value={value} />
        <Button text={'Добавить'} disabled={disabledAdd} onClick={() => addElement(value)} />
        <Button text={'Удалить'} disabled={disabledDelete} onClick={() => deleteElement()} />
        <Button text={'Очистить'} disabled={disabledDelete} extraClass={styles.margin} onClick={reset} />
      </form>
      {data.array && <ul className={styles.list}>
        {data.array.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={String(item.value)}
                index={index}
                state={item.state}
                tail={index === data.tail ? TAIL : ''}
                head={index === data.head ? HEAD : ''}
              />
            </li>
          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
