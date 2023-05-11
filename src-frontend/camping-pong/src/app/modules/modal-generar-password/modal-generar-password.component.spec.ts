import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerarPasswordComponent } from './modal-generar-password.component';

describe('ModalGenerarPasswordComponent', () => {
  let component: ModalGenerarPasswordComponent;
  let fixture: ComponentFixture<ModalGenerarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGenerarPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGenerarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
