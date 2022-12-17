import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { DELAY_IN_MS } from '../../../constants/delays';
import { StringComponent } from '../string';

describe('string tests', () => {
    const reversTest = (str: string, reversedStr: string) => {
        return async () => {
            render(<StringComponent />);

            const input = screen.getByTestId('input');
            const button = screen.getByText('Развернуть');
            const result = screen.getAllByTestId('circle').forEach(el => result + (el.textContent || ''));

            fireEvent.change(input, { target: { str } });
            fireEvent.click(button);

            await waitFor(() => {
                expect(result).toBe(reversedStr);
            }, { timeout: DELAY_IN_MS })
        }
    }

    it('with an even number of characters', () => {
        reversTest("123456", "654321");
    })

    it('with an odd number of characters', () => {
        reversTest("12345", "54321");
    })

    it('with one character', () => {
        reversTest('1', '1');
    })

    it('with an empty string', () => {
        reversTest('', '');
    })
})