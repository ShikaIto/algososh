import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { baseUrl, elementStatesColors, circle } from '../constants/constants';

describe('queue tests', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/queue`);
    })

    const buttonAdd = '[data-testid="queue_add"]';
    const input = 'input';

    it('button disabled', () => {
        cy.get(input).clear();
        cy.get(buttonAdd).should('be.disabled');
    })

    it('add to queue', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.clock();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(0).parent().contains('head');
        cy.get(circle).eq(0).parent().contains('tail');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');
        cy.get(circle).eq(1).parent().contains('tail');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
    })

    it('delete from queue', () => {
        cy.clock();
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

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
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="queue_reset"]').click();

        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(1).children('p').first().should('not.have.value');
    })
})