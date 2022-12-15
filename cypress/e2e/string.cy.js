import { DELAY_IN_MS } from '../../src/constants/delays';

describe('string tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion');
    })

    const elementStatesColors = {
        default: "rgb(0, 50, 255)",
        changing: "rgb(210, 82, 225)",
        modified: "rgb(127, 224, 81)",
    }

    it('button disabled', () => {
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })

    it('string algorithm', () => {
        cy.get('input').type('abc').should('have.value', 'abc');
        cy.get('button').contains('Развернуть').click();

        cy.get("[data-testid='circle_state']").as('circle');

        cy.clock();

        cy.get('@circle').eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('a');
        cy.get('@circle').eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('b');
        cy.get('@circle').eq(2).should('have.css', 'border-color', elementStatesColors.changing).contains('c');

        cy.tick(DELAY_IN_MS);

        cy.get('@circle').eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('c');
        cy.get('@circle').eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('b');
        cy.get('@circle').eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('a');

        cy.tick(DELAY_IN_MS);

        cy.get('@circle').eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('c');
        cy.get('@circle').eq(1).should('have.css', 'border-color', elementStatesColors.modified).contains('b');
        cy.get('@circle').eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('a');
    })
})