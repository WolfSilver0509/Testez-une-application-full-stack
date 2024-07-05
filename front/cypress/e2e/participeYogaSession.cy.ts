describe('Login tests (en français)', () => {
  it('Connexion réussie (Login successful)', () => {
    // Visiter la page de connexion
    cy.visit('/login');

    // Intercepter la requête POST /api/auth/login et simuler une réponse positive avec des informations utilisateur
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 5,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false
      },
    });

    // Intercepter la requête GET /api/session et fournir une session fictive
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [
        {
          "id": 1,
          "name": "Session Lyoko Yoga",
          "date": "2003-03-10T00:00:00.000+00:00",
          "teacher_id": 1,
          "description": "Description d'une session de yoga test Lyoko",
          "users": [],
          "createdAt": "2003-08-23T19:27:37",
          "updatedAt": "2005-10-23T19:27:37"
        }
      ]
    ).as('session');


    // Intercepter la requête GET /api/session/1 pour fournir des détails sur la session 1
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session/1',
      },
      {
        "id": 1,
        "name": "Session Lyoko Yoga",
        "date": "2003-03-10T00:00:00.000+00:00",
        "teacher_id": 1,
        "description": "Description d'une session de yoga test Lyoko",
        "users": [],
        "createdAt": "2003-08-23T19:27:37",
        "updatedAt": "2005-10-23T19:27:37"
      }
    );



    // Intercepter la requête GET /api/teacher/1 pour fournir des détails sur l'enseignant de la session 1
    cy.intercept(
      {
        method: 'GET',
        url: '/api/teacher/1',
      },
      {
        id: 1,
        lastName: "MORALES",
        firstName: "Jim",
        createdAt: "2003-03-23T18:23:27",
        updatedAt: "2003-03-23T18:23:27"
      }
    );


    // Intercepter la requête POST /api/session/1/participate/5 pour simuler la participation à la session
    cy.intercept('POST', '/api/session/1/participate/5', []);


    // Remplir les champs email et mot de passe pour se connecter
    cy.get('input[formControlName=email]').type("yoga@studio.com");

    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);

    // Vérifier la redirection vers la page de session
    cy.url().should('include', '/sessions');

// Cliquer sur le bouton "Détail" de la session
    cy.get('button').contains('Detail').click();
    cy.wait(2000); // Pause de 2 seconde pour observer le clic

// Vérifier la redirection vers la page de détail de la session
    cy.url().should('include', '/sessions/detail');

// Mettre à jour la réponse de la requête GET /api/session/1 pour inclure l'utilisateur actuel (ID 5)
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session/1',
      },
      {
        "id": 1,
        "name": "Session Lyoko Yoga",
        "date": "2003-03-10T00:00:00.000+00:00",
        "teacher_id": 1,
        "description": "Description d'une session de yoga test Lyoko",
        "users": [
          5
        ],
        "createdAt": "2024-02-23T19:27:37",
        "updatedAt": "2024-03-29T18:14:48"
      }
    );

    cy.wait(2000); // Pause de 2 secondes pour observer l'interception

// Cliquer sur le bouton "Participer" pour s'inscrire à la session
    cy.get('button').contains('Participate').click();
    cy.wait(1000); // Pause de 1 seconde pour observer le clic


  });
});
