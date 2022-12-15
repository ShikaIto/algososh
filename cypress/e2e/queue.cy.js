import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('queue tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue');
    })

    const elementStatesColors = {
        default: "rgb(0, 50, 255)",
        changing: "rgb(210, 82, 225)",
        modified: "rgb(127, 224, 81)",
    }

    const circle = "[data-testid='circle_state']";

    it('button disabled', () => {
        cy.get('input').clear();
        cy.get('[data-testid="queue_add"]').should('be.disabled');
    })

    it('add to queue', () => {
        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-testid="queue_add"]').click();

        cy.clock();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(0).parent().contains('head');
        cy.get(circle).eq(0).parent().contains('tail');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');

        cy.get('input').type('2').should('have.value', '2');
        cy.get('[data-testid="queue_add"]').click();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');
        cy.get(circle).eq(1).parent().contains('tail');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
    })

    it('delete from queue', () => {
        cy.clock();
        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-testid="queue_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('input').type('2').should('have.value', '2');
        cy.get('[data-testid="queue_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="queue_delete"]').click();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default);
        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
        cy.get(circle).eq(1).parent().contains('head');
        cy.get(circle).eq(1).parent().contains('tail');

        cy.get('[data-testid="queue_delete"]').click();
        
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(1).children('p').first().should('not.have.value');
    })

    it('reset queue', () => {
        cy.clock();
        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-testid="queue_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('input').type('2').should('have.value', '2');
        cy.get('[data-testid="queue_add"]').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="queue_reset"]').click();

        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(1).children('p').first().should('not.have.value');
    })
})