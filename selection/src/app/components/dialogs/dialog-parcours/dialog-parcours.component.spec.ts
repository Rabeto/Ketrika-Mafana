import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParcoursComponent } from './dialog-parcours.component';

describe('DialogParcoursComponent', () => {
  let component: DialogParcoursComponent;
  let fixture: ComponentFixture<DialogParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
