import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminDetailsDossierComponent } from './dialog-admin-details-dossier.component';

describe('DialogAdminDetailsDossierComponent', () => {
  let component: DialogAdminDetailsDossierComponent;
  let fixture: ComponentFixture<DialogAdminDetailsDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdminDetailsDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminDetailsDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
