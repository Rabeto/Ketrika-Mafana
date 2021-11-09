import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailsDossierComponent } from './dialog-details-dossier.component';

describe('DialogDetailsDossierComponent', () => {
  let component: DialogDetailsDossierComponent;
  let fixture: ComponentFixture<DialogDetailsDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailsDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailsDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
