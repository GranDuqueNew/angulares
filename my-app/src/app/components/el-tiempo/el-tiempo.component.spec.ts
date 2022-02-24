import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElTiempoComponent } from './el-tiempo.component';

describe('ElTiempoComponent', () => {
  let component: ElTiempoComponent;
  let fixture: ComponentFixture<ElTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
