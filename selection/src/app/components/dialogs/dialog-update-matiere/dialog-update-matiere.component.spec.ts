import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateMatiereComponent } from './dialog-update-matiere.component';

describe('DialogUpdateMatiereComponent', () => {
  let component: DialogUpdateMatiereComponent;
  let fixture: ComponentFixture<DialogUpdateMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateMatiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
