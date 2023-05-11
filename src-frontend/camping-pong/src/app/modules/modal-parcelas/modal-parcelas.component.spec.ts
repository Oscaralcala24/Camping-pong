import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParcelasComponent } from './modal-parcelas.component';

describe('ModalParcelasComponent', () => {
  let component: ModalParcelasComponent;
  let fixture: ComponentFixture<ModalParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParcelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
