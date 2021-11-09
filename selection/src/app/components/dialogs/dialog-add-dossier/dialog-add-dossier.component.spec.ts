import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDossierComponent } from './dialog-add-dossier.component';

describe('DialogAddDossierComponent', () => {
  let component: DialogAddDossierComponent;
  let fixture: ComponentFixture<DialogAddDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
