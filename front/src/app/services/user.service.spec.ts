import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { expect } from '@jest/globals';

import { UserService } from './user.service';

// Début de la description du groupe de tests pour le service UserService
describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;

  // Avant chaque test, configure le module de test, importe HttpClientModule, et injecte les services nécessaires
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule // Importation du module HttpClient pour les requêtes HTTP
      ]
    });
    service = TestBed.inject(UserService); // Injection du service UserService
    httpClient = TestBed.inject(HttpClient); // Injection du service HttpClient
  });

  // Test pour vérifier que le service est créé avec succès
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test pour vérifier que httpClient.get est appelé avec l'URL correcte lors de l'appel à la méthode getById
  it('should call httpClient.get with correct url on getById', () => {
    // Espionne la méthode get de httpClient et simule un retour de valeur
    const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of({}));
    // Appelle la méthode getById du service avec l'ID '1'
    service.getById('1');
    // Vérifie que la méthode get de httpClient a été appelée avec l'URL 'api/user/1'
    expect(spy).toHaveBeenCalledWith('api/user/1');
  });

  // Test pour vérifier que httpClient.delete est appelé avec l'URL correcte lors de l'appel à la méthode delete
  it('should call httpClient.delete with correct url on delete', () => {
    // Espionne la méthode delete de httpClient et simule un retour de valeur
    const spy = jest.spyOn(httpClient, 'delete').mockReturnValue(of({}));
    // Appelle la méthode delete du service avec l'ID '1'
    service.delete('1');
    // Vérifie que la méthode delete de httpClient a été appelée avec l'URL 'api/user/1'
    expect(spy).toHaveBeenCalledWith('api/user/1');
  });
});
