import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValorarCampingComponent } from './modal-valorar-camping.component';

describe('ModalValorarCampingComponent', () => {
  let component: ModalValorarCampingComponent;
  let fixture: ComponentFixture<ModalValorarCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValorarCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValorarCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
