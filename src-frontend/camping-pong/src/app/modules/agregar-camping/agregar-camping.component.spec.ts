import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCampingComponent } from './agregar-camping.component';

describe('AgregarCampingComponent', () => {
  let component: AgregarCampingComponent;
  let fixture: ComponentFixture<AgregarCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
