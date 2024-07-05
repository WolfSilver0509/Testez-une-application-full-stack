import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { NotFoundComponent } from './not-found.component';

// Début de la description du groupe de tests pour le composant NotFoundComponent
describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  // Avant chaque test, configure le module de test avec les déclarations nécessaires, compile les composants et crée une instance du composant
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ] // Déclaration du composant NotFoundComponent
    })
      .compileComponents(); // Compile les composants

    fixture = TestBed.createComponent(NotFoundComponent); // Création de l'instance de fixture pour NotFoundComponent
    component = fixture.componentInstance; // Récupération de l'instance du composant
    fixture.detectChanges(); // Déclenchement de la détection des changements pour mettre à jour la vue
  });

  // Test pour vérifier que le composant est créé avec succès
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
   * Test pour vérifier que la page contient bien le texte "Page not found !" en titre
   */
  it('should display "Page not found !"', () => {
    const compiled = fixture.nativeElement; // Récupération de l'élément natif compilé
    expect(compiled.querySelector('h1').textContent).toContain('Page not found !'); // Vérification que le contenu texte de l'élément <h1> contient "Page not found !"
  });
});
