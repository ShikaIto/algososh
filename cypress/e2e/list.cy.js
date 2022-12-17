import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { baseUrl, elementStatesColors, circle, circleSmall } from '../constants/constants';

describe('list tests', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/list`);
    })

    const inputText = '[data-testid="list_text"]';
    const inputIndex = '[data-testid="list_index"]';
    const buttonAddIndex = '[data-testid="list_add_index"]';

    it('button disabled', () => {
        cy.get(inputText).clear();
        cy.get('[data-testid="list_add_head"]').should('be.disabled');
        cy.get('[data-testid="list_add_tail"]').should('be.disabled');
        cy.get(buttonAddIndex).should('be.disabled');

        cy.get(inputIndex).clear();
        cy.get(buttonAddIndex).should('be.disabled');
        cy.get('[data-testid="list_delete_index"]').should('be.disabled');
    })

    it('default list', () => {
        cy.get(circle).eq(0).contains('0');
        cy.get(circle).eq(0).parent().contains('head');

        cy.get(circle).eq(1).contains('34');
        cy.get(circle).eq(2).contains('8');

        cy.get(circle).eq(3).contains('1');
        cy.get(circle).eq(3).parent().contains('tail');
    })

    it('add in head', () => {
        cy.get(inputText).type('23').should('have.value', '23');

        cy.get(circle).should('have.length', 4);

        cy.get('[data-testid="list_add_head"]').click();

        cy.clock();

        cy.get(circle).eq(0).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('23');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('23');
        cy.get(circle).eq(0).parent().contains('head');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('23');
    })

    it('add in tail', () => {
        cy.get(inputText).type('23').should('have.value', '23');

        cy.get(circle).should('have.length', 4);

        cy.get('[data-testid="list_add_tail"]').click();

        cy.clock();

        cy.get(circle).eq(3).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('23');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(4).should('have.css', 'border-color', elementStatesColors.modified).contains('23');
        cy.get(circle).eq(4).parent().contains('tail');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(4).should('have.css', 'border-color', elementStatesColors.default).contains('23');
    })

    it('add by index', () => {
        cy.get(inputText).type('23').should('have.value', '23');
        cy.get(inputIndex).type('2').should('have.value', '2');

        cy.get(circle).should('have.length', 4);

        cy.get(buttonAddIndex).click();

        cy.clock();

        cy.get(circle).eq(0).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('23');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(1).parent().find(circleSmall);
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(2).parent().find(circleSmall);
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('23');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default);
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.default).contains('23');
    })

    it('delete from head', () => {
        cy.get(circle).should('have.length', 4);

        cy.get('[data-testid="list_delete_head"]').click();

        cy.clock();

        cy.get(circle).eq(0).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('0');
        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('34');
        cy.get(circle).eq(0).parent().contains('head');
    })

    it('delete from tail', () => {
        cy.get(circle).should('have.length', 4);

        cy.get('[data-testid="list_delete_tail"]').click();

        cy.clock();

        cy.get(circle).eq(3).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(3).children('p').first().should('not.have.value');
        cy.get(circle).eq(3).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.default).contains('8');
        cy.get(circle).eq(2).parent().contains('tail');
    })

    it('delete by index', () => {
        cy.get(inputIndex).type('2').should('have.value', '2');

        cy.get(circle).should('have.length', 4);

        cy.get('[data-testid="list_delete_index"]').click();

        cy.clock();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.changing);

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(2).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('8');
        cy.get(circle).eq(2).children('p').first().should('not.have.value');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.default).contains('1');
    })
})