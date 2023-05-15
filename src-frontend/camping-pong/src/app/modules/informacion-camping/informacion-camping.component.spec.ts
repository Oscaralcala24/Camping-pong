import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCampingComponent } from './informacion-camping.component';

describe('InformacionCampingComponent', () => {
  let component: InformacionCampingComponent;
  let fixture: ComponentFixture<InformacionCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
