import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Session } from '../../interfaces/session.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SessionApiService } from '../../services/session-api.service';

// Début de la description du groupe de tests pour le composant DetailComponent
describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;
  let httpTestingController: HttpTestingController;
  let matSnackBar: MatSnackBar;
  let router: Router;
  let sessionApiService: SessionApiService;

  let deleteButton: DebugElement;

  // Mock du service SessionService
  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  };

  // Objet mock pour une session
  const session: Session = {
    id: 1,
    name: 'Yoga session test',
    description: 'description de yoga test',
    date: new Date('1996-10-8'),
    teacher_id: 1,
    users: [1],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Objet mock pour un enseignant
  const teacher: Teacher = {
    id: 1,
    lastName: 'lastname test',
    firstName: 'firstname test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Avant chaque test, configure le module de test, injecte les services nécessaires, et initialise les mocks
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule
      ],
      declarations: [DetailComponent],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    }).compileComponents();

    service = TestBed.inject(SessionService); // Injection du service SessionService
    httpTestingController = TestBed.inject(HttpTestingController); // Injection du contrôleur de test HTTP
    matSnackBar = TestBed.inject(MatSnackBar); // Injection de MatSnackBar
    router = TestBed.inject(Router); // Injection du service Router
    sessionApiService = TestBed.inject(SessionApiService); // Injection du service SessionApiService

    fixture = TestBed.createComponent(DetailComponent); // Création du composant DetailComponent pour les tests
    component = fixture.componentInstance; // Référence au composant créé
    component.sessionId = '1'; // Initialisation de l'ID de session du composant
    fixture.detectChanges(); // Détection des changements dans le composant

    // Simuler les requêtes HTTP pour récupérer la session et l'enseignant
    httpTestingController.expectOne('api/session/1').flush(session);
    httpTestingController.expectOne('api/teacher/1').flush(teacher);

    fixture.detectChanges(); // Détection des changements après la réponse HTTP

    deleteButton = fixture.debugElement.query(By.css('button[id="deleteBtn"]')); // Sélection du bouton de suppression
  });

  // Test pour vérifier que le composant est créé avec succès
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour vérifier l'affichage du bouton de suppression et l'appel des méthodes de suppression
  it('should display delete button and call delete methods successfully', async () => {
    jest.spyOn(matSnackBar, 'open').mockImplementation(); // Espionnage de la méthode open de MatSnackBar
    jest.spyOn(router, 'navigate').mockImplementation(); // Espionnage de la méthode navigate du Router

    expect(component.isAdmin).toBeTruthy(); // Vérifie que l'utilisateur est administrateur
    expect(component.session?.name).toBe('Yoga session test'); // Vérifie le nom de la session
    expect(component.teacher?.firstName).toBe('firstname test'); // Vérifie le prénom de l'enseignant
    expect(deleteButton).toBeTruthy(); // Vérifie que le bouton de suppression est présent

    deleteButton.triggerEventHandler('click', null); // Simule un clic sur le bouton de suppression
    await fixture.whenStable(); // Attend que les tâches asynchrones soient terminées
    fixture.detectChanges(); // Détection des changements après le clic

    // Vérifie qu'une requête DELETE a été faite avec la bonne URL
    const deleteReq = httpTestingController.expectOne('api/session/1');
    deleteReq.flush(null); // Simule une réponse vide

    expect(deleteReq.request.method).toBe('DELETE'); // Vérifie que la méthode de la requête est DELETE
    expect(matSnackBar.open).toHaveBeenCalledWith('Session deleted !', "Close", {"duration": 3000}); // Vérifie que MatSnackBar a été appelé avec le bon message
    expect(router.navigate).toHaveBeenCalledWith(['sessions']); // Vérifie que la navigation vers 'sessions' a été appelée
  });

  // Test pour vérifier la participation à la session
  it('should participate to the session', async() => {
    component.isAdmin = false; // L'utilisateur n'est pas administrateur
    component.isParticipate = false; // L'utilisateur ne participe pas encore
    fixture.detectChanges(); // Détection des changements

    const participationButton = fixture.debugElement.query(By.css('#participationBtn')); // Sélection du bouton de participation
    participationButton.triggerEventHandler('click', null); // Simule un clic sur le bouton de participation

    await fixture.whenStable(); // Attend que les tâches asynchrones soient terminées
    fixture.detectChanges(); // Détection des changements après le clic

    // Vérifie qu'une requête POST a été faite avec la bonne URL
    const participateReq = httpTestingController.expectOne('api/session/1/participate/1');
    participateReq.flush(null); // Simule une réponse vide

    expect(participateReq.request.method).toBe('POST'); // Vérifie que la méthode de la requête est POST

    // Simule les requêtes HTTP pour récupérer la session et l'enseignant après la participation
    httpTestingController.expectOne('api/session/1').flush(session);
    httpTestingController.expectOne('api/teacher/1').flush(teacher);

    expect(component.isParticipate).toBeTruthy(); // Vérifie que l'utilisateur participe à la session
  });

  // Test pour vérifier l'annulation de la participation à la session
  it('should unparticipate to the session', async() => {
    component.isAdmin = false; // L'utilisateur n'est pas administrateur
    component.isParticipate = true; // L'utilisateur participe déjà
    fixture.detectChanges(); // Détection des changements

    const participationButton = fixture.debugElement.query(By.css('#participationBtn')); // Sélection du bouton de participation
    participationButton.triggerEventHandler('click', null); // Simule un clic sur le bouton de participation

    await fixture.whenStable(); // Attend que les tâches asynchrones soient terminées
    fixture.detectChanges(); // Détection des changements après le clic

    // Vérifie qu'une requête DELETE a été faite avec la bonne URL
    const participateReq = httpTestingController.expectOne('api/session/1/participate/1');
    participateReq.flush(null); // Simule une réponse vide

    expect(participateReq.request.method).toBe('DELETE'); // Vérifie que la méthode de la requête est DELETE

    // Simule les requêtes HTTP pour récupérer la session mise à jour et l'enseignant après l'annulation de la participation
    httpTestingController.expectOne('api/session/1').flush({ ...session, users: [] });
    httpTestingController.expectOne('api/teacher/1').flush(teacher);

    expect(component.isParticipate).toBeFalsy(); // Vérifie que l'utilisateur ne participe plus à la session
  });
});
