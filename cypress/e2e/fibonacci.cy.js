import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('fibonacci tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci');
    })

    it('button disabled', () => {
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })

    it('fibonacci algorithm', () => {
        cy.get('input').type('5').should('have.value', '5');
        cy.get('button').contains('Рассчитать').click();

        cy.get("[data-testid='circle_state']").as('circle');

        cy.clock();

        cy.get('@circle').should('have.length', 1).eq(0).contains('1');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circle').should('have.length', 2).eq(1).contains('1');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circle').should('have.length', 3).eq(2).contains('2');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circle').should('have.length', 4).eq(3).contains('3');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circle').should('have.length', 5).eq(4).contains('5');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circle').should('have.length', 6).eq(5).contains('8');
    })
})