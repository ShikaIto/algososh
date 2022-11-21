import React, { FormEvent, ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from './list-page.module.css';
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list";
import { defaultArr } from "../../constants/default-arr";
import { Circle } from "../ui/circle/circle";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [value, setValue] = React.useState({ text: '', index: '' });
  const [topCircle, setTopCircle] = React.useState({ index: -1, elem: { value: '', state: ElementStates.Changing } });
  const [bottomCircle, setBottomCircle] = React.useState({ index: -1, elem: { value: '', state: ElementStates.Changing } })
  const [disabled, setDisabled] = useState(false);
  const [addLoader, setAddLoader] = useState({ index: false, tail: false, head: false });
  const [deleteLoader, setDeleteLoader] = useState({ index: false, tail: false, head: false });
  const [, update] = React.useState({});

  const linkedList = React.useRef(new LinkedList(defaultArr));

  const data = linkedList.current.getData();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const addTail = async (item: string) => {
    setDisabled(true);
    setAddLoader({ ...addLoader, tail: true });
    setTopCircle({ index: data.array.length - 1, elem: { value: item, state: ElementStates.Changing } });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.append({ value: item, state: ElementStates.Modified });
    setValue({ ...value, text: '' });
    setTopCircle({ ...topCircle, index: -1 });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.changeState(data.array.length - 1, ElementStates.Default);
    setDisabled(false);
    setAddLoader({ ...addLoader, tail: false });
  }

  const addHead = async (item: string) => {
    setDisabled(true);
    setAddLoader({ ...addLoader, head: true });
    setTopCircle({ index: 0, elem: { value: item, state: ElementStates.Changing } });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.prepend({ value: item, state: ElementStates.Modified });
    setValue({ ...value, text: '' });
    setTopCircle({ ...topCircle, index: -1 });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.changeState(0, ElementStates.Default);
    setDisabled(false);
    setAddLoader({ ...addLoader, head: false });
  }

  const addByIndex = async (index: number, item: string) => {
    setDisabled(true);
    setAddLoader({ ...addLoader, index: true });
    setTopCircle({ ...topCircle, elem: { value: item, state: ElementStates.Changing } });

    for (let i = 0; i <= index; i++) {
      setTopCircle({ index: i, elem: { value: item, state: ElementStates.Changing } });

      if (i > 0) {
        linkedList.current.changeState(i - 1, ElementStates.Changing);
        update({});
      }

      await delay(SHORT_DELAY_IN_MS);

      if (i === index) {
        linkedList.current.addByIndex(index, { value: item, state: ElementStates.Modified });
        setTopCircle({ ...topCircle, index: -1 });
        setValue({ index: '', text: '' });
      }
    }

    await delay(SHORT_DELAY_IN_MS);

    for (let i = 0; i <= index; i++) {
      linkedList.current.changeState(i, ElementStates.Default);
    }
    setDisabled(false);
    setAddLoader({ ...addLoader, index: false });
  }


  const deleteTail = async () => {
    setDisabled(true);
    setDeleteLoader({ ...deleteLoader, tail: true });
    linkedList.current.changeState(data.array.length - 1, ElementStates.Changing);
    setBottomCircle({ index: data.array.length - 1, elem: { value: data.tail?.element.value || '', state: ElementStates.Changing } });
    linkedList.current.changeValue(data.array.length - 1);

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.deleteTail();
    setBottomCircle({ ...bottomCircle, index: -1 });
    setDisabled(false);
    setDeleteLoader({ ...deleteLoader, tail: false });
  }

  const deleteHead = async () => {
    setDisabled(true);
    setDeleteLoader({ ...deleteLoader, head: true });
    linkedList.current.changeState(0, ElementStates.Changing);
    setBottomCircle({ index: 0, elem: { value: data.head?.element.value || '', state: ElementStates.Changing } });
    linkedList.current.changeValue(0);

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.deleteHead();
    setBottomCircle({ ...bottomCircle, index: -1 });
    setDisabled(false);
    setDeleteLoader({ ...deleteLoader, head: false });
  }

  const deleteByIndex = async (index: number) => {
    setDisabled(true);
    setDeleteLoader({ ...deleteLoader, index: true });
    for (let i = 0; i <= index; i++) {
      linkedList.current.changeState(i, ElementStates.Changing);
      update({});

      await delay(SHORT_DELAY_IN_MS);

      if (i === index) {
        setBottomCircle({ index: i, elem: { value: data.array[index].element.value, state: ElementStates.Changing } });
        linkedList.current.changeValue(index);
        update({});
      }
    }

    await delay(SHORT_DELAY_IN_MS);
    linkedList.current.deleteByIndex(index);
    setBottomCircle({ ...bottomCircle, index: -1 });
    setValue({ ...value, index: '' });

    for (let i = 0; i <= index - 1; i++) {
      linkedList.current.changeState(i, ElementStates.Default);
    }
    setDisabled(false);
    setDeleteLoader({ ...deleteLoader, index: false });
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.box}>
          <Input
            name="text"
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            onChange={onChange}
            value={value.text}
            extraClass={styles.input} />
          <Button text={'Добавить в head'}
            onClick={() => addHead(value.text)}
            disabled={disabled ? true : value.text ? false : true}
            isLoader={addLoader.head} />
          <Button text={'Добавить в tail'}
            onClick={() => addTail(value.text)}
            disabled={disabled ? true : value.text ? false : true}
            isLoader={addLoader.tail} />
          <Button text={'Удалить из head'}
            onClick={deleteHead}
            disabled={disabled ? true : data.array.length > 0 ? false : true}
            isLoader={deleteLoader.head} />
          <Button text={'Удалить из tail'}
            onClick={deleteTail}
            disabled={disabled ? true : data.array.length > 0 ? false : true}
            isLoader={deleteLoader.tail} />
        </fieldset>
        <fieldset className={styles.box}>
          <Input
            name="index"
            type='number'
            placeholder="Введите индекс"
            min={0}
            max={data.array.length - 1}
            onChange={onChange}
            value={value.index}
            extraClass={styles.input} />
          <Button
            text={'Добавить по индексу'}
            linkedList='big'
            disabled={disabled ? true : value.index && value.text ? false : true}
            onClick={() => addByIndex(Number(value.index), value.text)}
            isLoader={addLoader.index}
          />
          <Button
            text={'Удалить по инедксу'}
            linkedList='big'
            disabled={disabled ? true : value.index && data.array.length > 0 ? false : true}
            onClick={() => deleteByIndex(Number(value.index))}
            isLoader={deleteLoader.index}
          />
        </fieldset>
      </form>
      {data.array && <ul className={styles.list}>
        {data.array.map((item, index) => {
          return (
            <li key={index} className={styles.node}>
              <Circle
                letter={String(item.element.value)}
                index={index}
                state={item.element.state}
                tail={bottomCircle.index === index ?
                  <Circle letter={bottomCircle.elem.value} state={bottomCircle.elem.state} isSmall /> :
                  data.tail === item ? TAIL : ''}
                head={topCircle.index === index ?
                  <Circle letter={topCircle.elem.value} state={topCircle.elem.state} isSmall /> :
                  data.head === item ? HEAD : ''}
              />
              {index !== linkedList.current.array.length - 1 && (
                <ArrowIcon />
              )}
            </li>

          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
