import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelarReservaComponent } from './modal-cancelar-reserva.component';

describe('ModalCancelarReservaComponent', () => {
  let component: ModalCancelarReservaComponent;
  let fixture: ComponentFixture<ModalCancelarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCancelarReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCancelarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
