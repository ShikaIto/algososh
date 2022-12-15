import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('stack tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack');
    })

    const elementStatesColors = {
        default: "rgb(0, 50, 255)",
        changing: "rgb(210, 82, 225)",
        modified: "rgb(127, 224, 81)",
    }

    const circle = "[data-testid='circle_state']";

    it('button disabled', () => {
        cy.get('input').clear();
        cy.get('[data-testid="stack_add"]').should('be.disabled');
    })

    it('add to stack', () => {
        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-testid="stack_add"]').click();

        cy.clock();

        cy.get(circle)
        .should('have.length', 1)
        .eq(0)
        .should('have.css', 'border-color', elementStatesColors.changing)
        .contains('1');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');

        cy.get('input').type('2').should('have.value', '2');
        cy.get('[data-testid="stack_add"]').click();

        cy.get(circle)
        .should('have.length', 2)
        .eq(0)
        .should('have.css', 'border-color', elementStatesColors.default)
        .contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
    })

    it('delete from stack', () => {
        cy.clock();

        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-testid="stack_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('input').type('2').should('have.value', '2');
        cy.get('[data-testid="stack_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="stack_delete"]').click();

        cy.get(circle)
        .should('have.length', 2)
        .eq(0)
        .should('have.css', 'border-color', elementStatesColors.default)
        .contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle)
        .should('have.length', 1)
        .eq(0)
        .should('have.css', 'border-color', elementStatesColors.default)
        .contains('1');

        cy.get('[data-testid="stack_delete"]').click();

        cy.get(circle)
        .should('have.length', 1)
        .eq(0)
        .should('have.css', 'border-color', elementStatesColors.changing)
        .contains('1');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 0);
    })

    it('reset stack', () => {
        cy.clock();

        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-testid="stack_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('input').type('2').should('have.value', '2');
        cy.get('[data-testid="stack_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 2);

        cy.get('[data-testid="stack_reset"]').click();

        cy.get(circle).should('have.length', 0);
    })
})