describe('Tests de suppression de compte (Delete account spec)', () => {
  it('Suppression réussie de mon compte (Successfull delete my account)', () => {
    // Visiter la page de connexion
    cy.visit('/login');

    // Intercepter la requête POST /api/auth/login et simuler une réponse positive avec des informations utilisateur (admin)
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 5,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    });

    // Intercepter la requête GET /api/session et la désactiver
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session');

    // Intercepter la requête GET /api/user/5 et fournir des informations utilisateur fictives Mock
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/5',
      },
      {
        id: 5,
        email: "ulrich@code.com",
        lastName: "Stern",
        firstName: "Ulrich",
        admin: false,
        createdAt: "2003-03-29T17:18:56",
        updatedAt: "2003-11-29T17:15:56"
      }
    );
    cy.wait(1000); // Pause de 1 secondes pour observer l'interception

    // Intercepter la requête DELETE /api/user/3 et simuler une réponse vide
    cy.intercept('DELETE', '/api/user/3', [{}]);

    // Remplir les champs email et mot de passe pour se connecter
    cy.get('input[formControlName=email]').type("yoga@studio.com");

    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);

    // Vérifier la redirection vers la page de session
    cy.url().should('include', '/sessions');

    // Cliquer sur le menu "Compte"
    cy.get('span').contains('Account').click();

    // Cliquer sur le bouton "Détail"
    cy.get('button').contains('Detail').click();
    cy.wait(1000); // Pause de 1 seconde pour observer le clic

    // Vérifier la redirection vers la page d'accueil
    cy.url().should('include', '/');
  });
});
