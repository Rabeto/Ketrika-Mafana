import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloseSessionComponent } from './dialog-close-session.component';

describe('DialogCloseSessionComponent', () => {
  let component: DialogCloseSessionComponent;
  let fixture: ComponentFixture<DialogCloseSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCloseSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCloseSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
