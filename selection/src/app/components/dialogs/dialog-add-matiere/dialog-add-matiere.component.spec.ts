import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMatiereComponent } from './dialog-add-matiere.component';

describe('DialogAddMatiereComponent', () => {
  let component: DialogAddMatiereComponent;
  let fixture: ComponentFixture<DialogAddMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
