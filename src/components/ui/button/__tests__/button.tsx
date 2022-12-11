import renderer from 'react-test-renderer';
import { Button } from "../button";
import { fireEvent, render, screen } from "@testing-library/react";

const text = 'Текст кнопки'

describe("button tests", () => {

    it('button with text', () => {
        const tree = renderer.create(<Button text={text} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('button without text', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('button with disabled', () => {
        const tree = renderer.create(<Button disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('button with loader', () => {
        const tree = renderer.create(<Button isLoader />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('button onclick', () => {
        const mockOnClick = jest.fn();
        render(<Button text={text} onClick={mockOnClick} />)
        const button = screen.getByText(text);
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    })
})