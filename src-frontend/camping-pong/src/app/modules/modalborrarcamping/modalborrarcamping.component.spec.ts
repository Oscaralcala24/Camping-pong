import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalborrarcampingComponent } from './modalborrarcamping.component';

describe('ModalborrarcampingComponent', () => {
  let component: ModalborrarcampingComponent;
  let fixture: ComponentFixture<ModalborrarcampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalborrarcampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalborrarcampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
