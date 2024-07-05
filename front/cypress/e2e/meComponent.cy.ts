describe('MeComponent tests (en français)', () => {
  it('Récupère les informations utilisateur avec succès (Succfull get user informations)', () => {
    // Visiter la page de connexion
    cy.visit('/login');
    cy.wait(2000); // Pause de 2 secondes pour observer la navigation

    // Intercepter la requête POST /api/auth/login et simuler une réponse positive
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    });

    // Intercepter la requête GET /api/session et la désactiver (temporaire)
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session');

    // Intercepter la requête GET /api/user/1 et fournir des données utilisateur fictives
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/1',
      },
      {
        "id": 4,
        "email": "yoga@studio.com",
        "lastName": "Admin",
        "firstName": "Admin",
        "admin": true,
        "createdAt": "2024-03-29T17:11:33",
        "updatedAt": "2024-03-29T17:11:33"
      }
    );

    cy.wait(2000); // Pause de 2 secondes pour observer l'interception

    // Remplir les champs email et mot de passe
    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.wait(1000); // Pause de 1 seconde pour observer la saisie

    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);
    cy.wait(2000); // Pause de 2 secondes pour observer la soumission

    // Vérifier la redirection vers la page de session
    cy.url().should('include', '/sessions');

    // Cliquer sur le menu "Compte" (simule la navigation vers MeComponent)
    cy.get('span').contains('Account').click();
    cy.wait(2000); // Pause de 2 secondes pour observer la navigation
  });
});
