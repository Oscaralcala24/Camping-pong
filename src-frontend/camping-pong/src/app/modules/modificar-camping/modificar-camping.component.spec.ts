import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCampingComponent } from './modificar-camping.component';

describe('ModificarCampingComponent', () => {
  let component: ModificarCampingComponent;
  let fixture: ComponentFixture<ModificarCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
