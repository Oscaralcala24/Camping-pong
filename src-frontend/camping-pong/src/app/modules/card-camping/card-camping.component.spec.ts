import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCampingComponent } from './card-camping.component';

describe('CardCampingComponent', () => {
  let component: CardCampingComponent;
  let fixture: ComponentFixture<CardCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
