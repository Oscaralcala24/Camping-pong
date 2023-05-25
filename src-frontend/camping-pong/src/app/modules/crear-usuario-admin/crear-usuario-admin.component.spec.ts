import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioAdminComponent } from './crear-usuario-admin.component';

describe('CrearUsuarioAdminComponent', () => {
  let component: CrearUsuarioAdminComponent;
  let fixture: ComponentFixture<CrearUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUsuarioAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
