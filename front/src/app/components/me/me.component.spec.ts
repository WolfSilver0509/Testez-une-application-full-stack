import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
// import { expect } from 'jest';  ===> A voir !

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  // Nous créons un faux service de session pour simuler le comportement de notre vrai service
  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  // Avant chaque test, nous configurons notre module de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      // Nous remplaçons le vrai service de session par notre faux service
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();

    // Nous créons une instance de notre composant à tester
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    // Nous déclenchons le cycle de vie du composant pour qu'il initialise ses propriétés
    fixture.detectChanges();
  });

  // Notre premier test vérifie simplement que le composant peut être correctement créé
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Vous pouvez ajouter d'autres tests ici pour vérifier le comportement de votre composant
});
