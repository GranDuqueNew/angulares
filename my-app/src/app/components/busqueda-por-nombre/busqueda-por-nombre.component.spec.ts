import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorNombreComponent } from './busqueda-por-nombre.component';

describe('BusquedaPorNombreComponent', () => {
  let component: BusquedaPorNombreComponent;
  let fixture: ComponentFixture<BusquedaPorNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaPorNombreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPorNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
