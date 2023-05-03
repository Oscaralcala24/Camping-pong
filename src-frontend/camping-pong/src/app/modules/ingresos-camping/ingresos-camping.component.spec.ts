import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosCampingComponent } from './ingresos-camping.component';

describe('IngresosCampingComponent', () => {
  let component: IngresosCampingComponent;
  let fixture: ComponentFixture<IngresosCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresosCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
