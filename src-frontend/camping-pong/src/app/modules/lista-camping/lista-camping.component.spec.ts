import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCampingComponent } from './lista-camping.component';

describe('ListaCampingComponent', () => {
  let component: ListaCampingComponent;
  let fixture: ComponentFixture<ListaCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
