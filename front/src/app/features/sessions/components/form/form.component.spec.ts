import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Session } from '../../interfaces/session.interface';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  // Mock pour SessionService
  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  };

  // Mock pour Router
  const mockRouterService = {
    url: '/sessions/create',
    root: {},
  };

  let router: Router;
  let activatedRoute: ActivatedRoute;
  let sessionApiService: SessionApiService;
  let httpTestingController: HttpTestingController;
  let matSnackBar: MatSnackBar;

  let nameInput: DebugElement;
  let dateInput: DebugElement;
  let teacherInput: DebugElement;
  let descriptionInput: DebugElement;

  let sessionForm: DebugElement;

  // Objet session pour les tests
  const session: Session = {
    id: 1,
    name: 'Yoga Session',
    description: 'description session de yoga',
    date: new Date('1996-10-08'),
    teacher_id: 1,
    users: [1],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        SessionApiService
      ],
      declarations: [FormComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sessionApiService = TestBed.inject(SessionApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  describe('Create session form', () => {

    beforeEach(() => {
      const mockUrlTree = router.parseUrl('/sessions/create');
      // @ts-ignore: force this private property value for testing.
      router.currentUrlTree = mockUrlTree;

      fixture = TestBed.createComponent(FormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
      dateInput = fixture.debugElement.query(By.css('input[formControlName="date"]'));
      teacherInput = fixture.debugElement.query(By.css('mat-select[formControlName="teacher_id"]'));
      descriptionInput = fixture.debugElement.query(By.css('textarea[formControlName="description"]'));

      sessionForm = fixture.debugElement.query(By.css('.mt2'));
    });

    // Test pour vérifier que le composant est créé
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // Test pour vérifier l'affichage du formulaire de création de session
    it('should display create session form', () => {
      expect(component.onUpdate).toBeFalsy();

      expect(component.sessionForm?.controls['name'].value).toBeFalsy();
      expect(component.sessionForm?.controls['date'].value).toBeFalsy();
      expect(component.sessionForm?.controls['teacher_id'].value).toBeFalsy();
      expect(component.sessionForm?.controls['description'].value).toBeFalsy();
    });

    // Test pour vérifier la création d'une nouvelle session et la redirection vers la route des sessions
    it('should successfully create a new session and redirect on sessions route', async () => {
      jest.spyOn(matSnackBar, 'open').mockImplementation();
      jest.spyOn(router, 'navigate').mockImplementation();
      nameInput.nativeElement.value = session.name;
      dateInput.nativeElement.value = session.date;
      teacherInput.nativeElement.value = session.teacher_id;
      descriptionInput.nativeElement.value = session.description;

      nameInput.nativeElement.dispatchEvent(new Event('input'));
      dateInput.nativeElement.dispatchEvent(new Event('input'));
      teacherInput.nativeElement.dispatchEvent(new Event('input'));
      descriptionInput.nativeElement.dispatchEvent(new Event('input'));

      sessionForm.triggerEventHandler('ngSubmit', null);
      await fixture.whenStable();
      fixture.detectChanges();

      const req = httpTestingController.expectOne('api/session');

      req.flush(session);
      expect(req.request.method).toBe('POST');

      expect(matSnackBar.open).toHaveBeenCalledWith('Session created !', "Close", { "duration": 3000 });
      expect(router.navigate).toBeCalledWith(['sessions']);
    });
  });

  describe('Update session form', () => {

    beforeEach(async () => {
      const mockUrlTree = router.parseUrl('/sessions/update/1');
      // @ts-ignore: force this private property value for testing.
      router.currentUrlTree = mockUrlTree;

      jest.spyOn(activatedRoute.snapshot.paramMap, 'get').mockReturnValue('1');

      fixture = TestBed.createComponent(FormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    // Test pour vérifier que le composant est créé
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // Test pour vérifier l'affichage du formulaire de mise à jour de session
    it('should display update session form', () => {
      const req = httpTestingController.expectOne('api/session/1');
      req.flush(session);

      expect(component.onUpdate).toBeTruthy();

      expect(component.sessionForm?.controls['name'].value).toBe('Yoga Session');
      expect(component.sessionForm?.controls['date'].value).toBe('1996-10-08');
      expect(component.sessionForm?.controls['teacher_id'].value).toBe(1);
      expect(component.sessionForm?.controls['description'].value).toBe('description session de yoga');
    });

    // Test pour vérifier la mise à jour d'une session
    it('should successfully update a session', async () => {
      const request = httpTestingController.expectOne('api/session/1');
      request.flush(session);

      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.sessionForm).toBeTruthy();

      nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
      dateInput = fixture.debugElement.query(By.css('input[formControlName="date"]'));
      teacherInput = fixture.debugElement.query(By.css('mat-select[formControlName="teacher_id"]'));
      descriptionInput = fixture.debugElement.query(By.css('textarea[formControlName="description"]'));

      sessionForm = fixture.debugElement.query(By.css('.mt2'));

      jest.spyOn(matSnackBar, 'open').mockImplementation();
      jest.spyOn(router, 'navigate').mockImplementation();
      nameInput.nativeElement.value = session.name;
      dateInput.nativeElement.value = session.date;
      teacherInput.nativeElement.value = session.teacher_id;
      descriptionInput.nativeElement.value = session.description;

      nameInput.nativeElement.dispatchEvent(new Event('input'));
      dateInput.nativeElement.dispatchEvent(new Event('input'));
      teacherInput.nativeElement.dispatchEvent(new Event('input'));
      descriptionInput.nativeElement.dispatchEvent(new Event('input'));

      sessionForm.triggerEventHandler('ngSubmit', null);
      await fixture.whenStable();
      fixture.detectChanges();

      const req = httpTestingController.expectOne('api/session/1');
      req.flush(session);
      expect(req.request.method).toBe('PUT');

      expect(matSnackBar.open).toHaveBeenCalledWith('Session updated !', "Close", { "duration": 3000 });
      expect(router.navigate).toBeCalledWith(['sessions']);
    });
  });
});
