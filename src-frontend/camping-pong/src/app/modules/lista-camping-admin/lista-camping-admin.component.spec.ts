import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCampingAdminComponent } from './lista-camping-admin.component';

describe('ListaCampingAdminComponent', () => {
  let component: ListaCampingAdminComponent;
  let fixture: ComponentFixture<ListaCampingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCampingAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCampingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
