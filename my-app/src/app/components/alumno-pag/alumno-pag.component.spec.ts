import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoPagComponent } from './alumno-pag.component';

describe('AlumnoPagComponent', () => {
  let component: AlumnoPagComponent;
  let fixture: ComponentFixture<AlumnoPagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoPagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
