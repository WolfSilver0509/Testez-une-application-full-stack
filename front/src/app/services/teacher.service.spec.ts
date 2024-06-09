import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';

// Début de la description du groupe de tests pour le service TeacherService
describe('TeacherService', () => {
  let service: TeacherService;
  let httpClient: HttpClient;

  // Avant chaque test, configure le module de test, importe HttpClientModule, et injecte les services nécessaires
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule // Importation du module HttpClient pour les requêtes HTTP
      ]
    });
    service = TestBed.inject(TeacherService); // Injection du service TeacherService
    httpClient = TestBed.inject(HttpClient); // Injection du service HttpClient
  });

  // Test pour vérifier que le service est créé avec succès
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test pour vérifier que httpClient.get est appelé avec l'URL correcte lors de l'appel à la méthode all
  it('should call httpClient.get with correct url on all', () => {
    // Espionne la méthode get de httpClient et simule un retour de valeur
    const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of([]));
    // Appelle la méthode all du service
    service.all();
    // Vérifie que la méthode get de httpClient a été appelée avec l'URL 'api/teacher'
    expect(spy).toHaveBeenCalledWith('api/teacher');
  });

  // Test pour vérifier que httpClient.get est appelé avec l'URL correcte lors de l'appel à la méthode detail
  it('should call httpClient.get with correct url on detail', () => {
    // Espionne la méthode get de httpClient et simule un retour de valeur
    const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of({}));
    // Appelle la méthode detail du service avec l'ID '1'
    service.detail('1');
    // Vérifie que la méthode get de httpClient a été appelée avec l'URL 'api/teacher/1'
    expect(spy).toHaveBeenCalledWith('api/teacher/1');
  });
});
