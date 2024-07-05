import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from "../interfaces/sessionInformation.interface";

// Début de la description du groupe de tests pour le service SessionService
describe('SessionService', () => {
  let service: SessionService;

  // Avant chaque test, configure le module de test et injecte le service SessionService
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  // Test pour vérifier que le service est créé avec succès
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test pour vérifier que isLogged est défini à true et que sessionInformation est bien défini lors de la connexion
  it('should set isLogged to true and sessionInformation on logIn', () => {
    const user: SessionInformation = {
      admin: true, // Indique que l'utilisateur est un administrateur
      id: 1, // Identifiant de l'utilisateur
      token: 'token-test', // Token de session
      type: 'type_test', // Type de session
      username: 'username-test', // Nom d'utilisateur
      firstName: 'firstName-test', // Prénom de l'utilisateur
      lastName: 'lastName-test' // Nom de famille de l'utilisateur
    };
    // Appelle la méthode logIn avec les informations de l'utilisateur
    service.logIn(user);
    // Vérifie que isLogged est à true après la connexion
    expect(service.isLogged).toBe(true);
    // Vérifie que les informations de session sont correctement définies
    expect(service.sessionInformation).toEqual(user);
  });

  // Test pour vérifier que isLogged est défini à false et que sessionInformation est à undefined lors de la déconnexion
  it('should set isLogged to false and sessionInformation to undefined on logOut', () => {
    // Appelle la méthode logOut
    service.logOut();
    // Vérifie que isLogged est à false après la déconnexion
    expect(service.isLogged).toBe(false);
    // Vérifie que les informations de session sont undefined après la déconnexion
    expect(service.sessionInformation).toBeUndefined();
  });

  // Test pour vérifier que $isLogged retourne un Observable de isLogged
  it('should return an Observable of isLogged on $isLogged', done => {
    // S'abonne à l'Observable $isLogged
    service.$isLogged().subscribe(value => {
      // Vérifie que la valeur retournée par l'Observable est false
      expect(value).toBe(false);
      // Indique que le test est terminé
      done();
    });
  });
});
