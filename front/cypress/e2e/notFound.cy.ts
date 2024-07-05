describe('NotFoundComponent', () => {
  it('should display "Page not found !" message', () => {
    // Visitez une URL qui n'existe pas dans votre application
    cy.visit('/non-existing-url')

    // Vérifiez si le texte "Page not found !" est affiché
    cy.contains('Page not found !').should('be.visible');
  });
});
