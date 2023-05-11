import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioAdminComponent } from './modificar-usuario-admin.component';

describe('ModificarUsuarioAdminComponent', () => {
  let component: ModificarUsuarioAdminComponent;
  let fixture: ComponentFixture<ModificarUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarUsuarioAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
