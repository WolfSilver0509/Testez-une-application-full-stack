describe('Register tests (en français)', () => {
  it('Enregistrement réussi (Register successfull)', () => {
    // Visiter la page d'inscription
    cy.visit('/register');
    cy.wait(2000); // Pause de 2 secondes pour observer la navigation

    // Intercepter la requête POST /api/auth/register (simuler la réponse du serveur)

    cy.intercept('POST', '/api/auth/register', {

      statusCode: 201, // Code de réponse indiquant la création
      body: {
        message: "User registered successfully!"
      }
    });

    cy.wait(500); // Pause de 1/2 secondes pour observer l'interception

    // Remplir les champs du formulaire d'inscription
    cy.get('input[formControlName=firstName]').type("Jeremy");

    cy.get('input[formControlName=lastName]').type("Belpois");

    cy.get('input[formControlName=email]').type("jeremy@code.com");

    cy.get('input[formControlName=password]').type(`${"password!31code"}{enter}{enter}`);
    cy.wait(1000); // Pause de 1 secondes pour observer la soumission

    // Vérifier la redirection vers la page de connexion
    cy.url().should('include', '/login');
  });
});
