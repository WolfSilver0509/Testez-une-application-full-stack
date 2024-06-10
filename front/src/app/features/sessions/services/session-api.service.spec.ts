import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Session } from '../interfaces/session.interface';

// Début de la description du groupe de tests pour le service SessionApiService
describe('SessionsService', () => {
  const pathService = 'api/session' // Chemin de base pour les appels API du service

  let service: SessionApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let sessionMock : Session; // Déclaration d'un objet mock pour une session

  // Avant chaque test, configure le module de test, injecte les services nécessaires, et initialise les mocks
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule // Utilisation du module de test HttpClient pour simuler les requêtes HTTP
      ]
    });
    service = TestBed.inject(SessionApiService); // Injection du service SessionApiService
    httpClient = TestBed.inject(HttpClient); // Injection du service HttpClient
    httpTestingController = TestBed.inject(HttpTestingController); // Injection du contrôleur de test HTTP

    // Initialisation du mock de session
    sessionMock = {
      id: 1,
      name: 'sessionName',
      description: 'description',
      date: new Date(),
      teacher_id: 1,
      users: [1],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  // Après chaque test, vérifier qu'il n'y a plus de requêtes en attente
  afterEach(() => {
    httpTestingController.verify();
  });

  // Test pour vérifier que le service est créé avec succès
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test pour vérifier que le service appelle correctement le point de terminaison delete
  it('should call delete endpoint', () => {
    service.delete('1').subscribe();

    // Vérifie qu'une requête DELETE a été faite avec la bonne URL
    const req = httpTestingController.expectOne(pathService + '/1');
    req.flush(null); // Simule une réponse vide

    expect(req.request.method).toBe('DELETE'); // Vérifie que la méthode de la requête est DELETE
  });

  // Test pour vérifier que le service appelle correctement le point de terminaison create et retourne la session créée
  it('should call create and return a Session create', () => {
    service.create(sessionMock).subscribe(session => {
      expect(session.name).toBe('sessionName'); // Vérifie que le nom de la session retournée est correct
    });

    // Vérifie qu'une requête POST a été faite avec la bonne URL
    const req = httpTestingController.expectOne(pathService);
    req.flush(sessionMock); // Simule une réponse avec le mock de session

    expect(req.request.method).toBe('POST'); // Vérifie que la méthode de la requête est POST
  });

  // Test pour vérifier que le service appelle correctement le point de terminaison update et retourne la session mise à jour
  it('should call update and return Session update', () => {
    service.update('1', sessionMock).subscribe(session => {
      expect(session.name).toBe('sessionName'); // Vérifie que le nom de la session retournée est correct
    });

    // Vérifie qu'une requête PUT a été faite avec la bonne URL
    const req = httpTestingController.expectOne(pathService + '/1');
    req.flush(sessionMock); // Simule une réponse avec le mock de session

    expect(req.request.method).toBe('PUT'); // Vérifie que la méthode de la requête est PUT
  });

  // Test pour vérifier que le service appelle correctement le point de terminaison participate
  it('should call participate', () => {
    service.participate('1', '1').subscribe();

    // Vérifie qu'une requête POST a été faite avec la bonne URL
    const req = httpTestingController.expectOne(pathService + '/1/participate/1');
    req.flush(null); // Simule une réponse vide

    expect(req.request.method).toBe('POST'); // Vérifie que la méthode de la requête est POST
  });

  // Test pour vérifier que le service appelle correctement le point de terminaison unparticipate
  it('should call unparticipate', () => {
    service.unParticipate('1', '1').subscribe();

    // Vérifie qu'une requête DELETE a été faite avec la bonne URL
    const req = httpTestingController.expectOne(pathService + '/1/participate/1');
    req.flush(null); // Simule une réponse vide

    expect(req.request.method).toBe('DELETE'); // Vérifie que la méthode de la requête est DELETE
  });

});
