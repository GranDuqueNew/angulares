import { TestBed } from '@angular/core/testing';

import { ElTiempoService } from './el-tiempo.service';

describe('ElTiempoService', () => {
  let service: ElTiempoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElTiempoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
