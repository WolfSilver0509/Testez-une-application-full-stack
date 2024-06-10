import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../auth-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

/*
* Début du bloc de test du composant RegisterComponent.
*/
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let router: Router;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let registerForm: DebugElement;

  /*
  * Configuration des tests avant chaque test.
  */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        RouterTestingModule.withRoutes(routes)
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement;
    firstNameInput = fixture.debugElement.query(By.css('input[formControlName="firstName"]')).nativeElement;
    lastNameInput = fixture.debugElement.query(By.css('input[formControlName="lastName"]')).nativeElement;
    registerForm = fixture.debugElement.query(By.css('.register-form'));
  });

  /*
  * Test pour vérifier que le composant est créé correctement.
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test pour vérifier que les méthodes du formulaire sont appelées et la redirection vers la page de connexion.

  it('call form methods and redirect to login page', async () => {
    // Arrange
    jest.spyOn(router, 'navigate').mockImplementation();

    emailInput.value = 'yumi@code.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'Password31!';
    passwordInput.dispatchEvent(new Event('input'));
    firstNameInput.value = 'firstName';
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.value = 'lastName';
    lastNameInput.dispatchEvent(new Event('input'));

    registerForm.triggerEventHandler('ngSubmit', null);
    await fixture.whenStable();
    fixture.detectChanges();

    const req = httpTestingController.expectOne('api/auth/register');

    req.flush(null);

    expect(component.form.valid).toBeTruthy();
    expect(component.onError).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);


    httpTestingController.verify();
  });

  /*
  * Test pour vérifier que l'inscription échoue en raison de saisies invalides.
  */
  it('Unsuccessfully register due to invalid inputs', async () => {
    emailInput.value = 'WhoIamcode.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '1';
    passwordInput.dispatchEvent(new Event('input'));
    firstNameInput.value = '';
    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.value = '';
    lastNameInput.dispatchEvent(new Event('input'));

    registerForm.triggerEventHandler('ngSubmit', null);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.form.controls['email'].valid).toBeFalsy();
    expect(component.form.controls['password'].valid).toBeFalsy();
    expect(component.form.controls['firstName'].valid).toBeFalsy();
    expect(component.form.controls['lastName'].valid).toBeFalsy();
  });

  /*
  * Test pour vérifier la gestion des erreurs lors de l'inscription.
  */
  it('Throw an error for empty mandatory input', () => {
    component.form.setValue({ email: 'yumi@code.com', password: 'codepassword', firstName: 'Yumi', lastName: 'Ishiyama' });

    component.submit();
    fixture.detectChanges();

    const req = httpTestingController.expectOne('api/auth/register');

    req.error(new ProgressEvent('Register error'));

    expect(component.onError).toBeTruthy();

    httpTestingController.verify();
  });
});
