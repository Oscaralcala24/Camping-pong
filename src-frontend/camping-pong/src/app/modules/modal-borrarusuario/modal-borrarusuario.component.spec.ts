import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrarusuarioComponent } from './modal-borrarusuario.component';

describe('ModalBorrarusuarioComponent', () => {
  let component: ModalBorrarusuarioComponent;
  let fixture: ComponentFixture<ModalBorrarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBorrarusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBorrarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
