import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateCompteComponent } from './dialog-update-compte.component';

describe('DialogUpdateCompteComponent', () => {
  let component: DialogUpdateCompteComponent;
  let fixture: ComponentFixture<DialogUpdateCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
