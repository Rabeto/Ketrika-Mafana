import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateParcoursComponent } from './dialog-update-parcours.component';

describe('DialogUpdateParcoursComponent', () => {
  let component: DialogUpdateParcoursComponent;
  let fixture: ComponentFixture<DialogUpdateParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
