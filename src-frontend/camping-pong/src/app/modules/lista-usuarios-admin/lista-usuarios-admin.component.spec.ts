import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosAdminComponent } from './lista-usuarios-admin.component';

describe('ListaUsuariosAdminComponent', () => {
  let component: ListaUsuariosAdminComponent;
  let fixture: ComponentFixture<ListaUsuariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUsuariosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
