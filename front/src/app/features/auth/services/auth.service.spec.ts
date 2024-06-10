import { TestBed, fakeAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { SessionInformation } from "src/app/interfaces/sessionInformation.interface";
import { expect } from '@jest/globals';

/*
* Début du bloc de test du service AuthService.
*/
describe('AuthService', () => {
  // Déclaration de la constante pour le  service d'authentification
  const pathService = 'api/auth';

  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  /*
  * Configuration des tests avant démarrage
  */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  /*
  * Vérification après chaque test pour s'assurer qu'il n'y a pas de requêtes HTTP en attente.
  */
  afterEach(() => {

    httpTestingController.verify();
  });

  /*
  * Test pour vérifier que le service est créé correctement.
  */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  * Test pour vérifier que l'appel au point de terminaison  fonctionne.
  */
  it('should call register endpoint', () => {
    service.register({
      email: 'yumi@code.com',
      firstName: 'firstname',
      lastName: 'lastname',
      password: '123456'
    }).subscribe();

    const req = httpTestingController.expectOne(pathService + '/register');

    req.flush(null);
    expect(req.request.method).toBe('POST');
  });

  /*
  * Test pour vérifier que l'appel au point de terminaison de connexion fonctionne et retourne les informations de session.
  */
  it('should call login endpoint and return SessionInformation', () => {
    service.login({
      email: 'yumi@code.com',
      password: 'codePassword'
    }).subscribe(sessionInformation => {
      expect(sessionInformation.firstName).toBe('Yumi');
    });

    const req = httpTestingController.expectOne(pathService + '/login');

    req.flush({
      token: 'token',
      type: 'userSession',
      id: 1,
      username: 'yumi@code.com',
      firstName: 'Yumi',
      lastName: 'Ishiyama',
      admin: false
    });
    expect(req.request.method).toBe('POST');
  });
});
