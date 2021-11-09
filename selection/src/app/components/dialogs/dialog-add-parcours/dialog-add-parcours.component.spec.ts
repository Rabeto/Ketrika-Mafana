import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddParcoursComponent } from './dialog-add-parcours.component';

describe('DialogAddParcoursComponent', () => {
  let component: DialogAddParcoursComponent;
  let fixture: ComponentFixture<DialogAddParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
