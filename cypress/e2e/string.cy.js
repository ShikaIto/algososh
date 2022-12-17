import { DELAY_IN_MS } from '../../src/constants/delays';
import { baseUrl, elementStatesColors, circle } from '../constants/constants';

describe('string tests', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/recursion`);
    })

    it('button disabled', () => {
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })

    it('string algorithm', () => {
        cy.get('input').type('abc').should('have.value', 'abc');
        cy.get('button').contains('Развернуть').click();

        cy.clock();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('a');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('b');
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.changing).contains('c');

        cy.tick(DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('c');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('b');
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('a');

        cy.tick(DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('c');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.modified).contains('b');
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('a');
    })
})