import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagoReservaComponent } from './detalle-pago-reserva.component';

describe('DetallePagoReservaComponent', () => {
  let component: DetallePagoReservaComponent;
  let fixture: ComponentFixture<DetallePagoReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePagoReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePagoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
