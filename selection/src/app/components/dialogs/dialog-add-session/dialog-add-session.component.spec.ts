import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSessionComponent } from './dialog-add-session.component';

describe('DialogAddSessionComponent', () => {
  let component: DialogAddSessionComponent;
  let fixture: ComponentFixture<DialogAddSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
