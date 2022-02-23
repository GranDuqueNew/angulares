import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaBusquedaAlumnosComponent } from './caja-busqueda-alumnos.component';

describe('CajaBusquedaAlumnosComponent', () => {
  let component: CajaBusquedaAlumnosComponent;
  let fixture: ComponentFixture<CajaBusquedaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaBusquedaAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaBusquedaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
