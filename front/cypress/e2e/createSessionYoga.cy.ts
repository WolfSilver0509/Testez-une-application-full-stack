describe('Tests de création de session (Create session spec)', () => {
  it('Création de session réussie (Successfull Create session)', () => {
    // Visiter la page de connexion
    cy.visit('/login');

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

    // Intercepter la requête GET /api/teacher et fournir des données fictives sur les enseignants
    cy.intercept('GET', '/api/teacher', {
      body: [
        {
          id: 1,
          lastName: "MORALES",
          firstName: "Jim",
          createdAt: "2003-03-23T18:23:27",
          updatedAt: "2003-03-23T18:23:27"
        },
        {
          id: 2,
          lastName: "HOPPER",
          firstName: "Franz",
          createdAt: "2003-08-23T18:23:27",
          updatedAt: "2003-08-23T18:23:27"
        }
      ]
    });


    // Intercepter la requête POST /api/session et simuler la réponse du serveur pour la création de session
    cy.intercept('POST', '/api/session', {
      statusCode: 201, // Code de réponse indiquant la création
      body: {
        message: "Session créée avec succès !" // Message de confirmation
      }
    });

    cy.wait(2000); // Pause de 2 secondes pour observer l'interception

    // Remplir les champs email et mot de passe pour se connecter
    cy.get('input[formControlName=email]').type("yoga@studio.com");

    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);

    // Vérifier la redirection vers la page de session
    cy.url().should('include', '/sessions');

    // Cliquer sur le bouton de création de session
    cy.get('button').click();

    // Vérifier la redirection vers la page de création de session
    cy.url().should('include', '/sessions/create');

    // Remplir le formulaire de création de session
    cy.get('input[formControlName=name]').type("Titre de la session");

    cy.get('input[formControlName=date]').type("2023-01-12");

    // Cliquer sur le sélecteur d'enseignant
    cy.get('mat-select').click();

    // Sélectionner le premier enseignant disponible (peut être ajusté)
    cy.get('mat-option').first().click();

    cy.get('textarea').type("Description de la session");

// Cliquer sur le bouton "Enregistrer"
    cy.get('button').contains('Save').click();
    cy.wait(2000); // Pause de 2 secondes pour observer le clic

// Vérifier la redirection vers la page de liste des sessions
    cy.url().should('include', '/sessions');
  });
});
