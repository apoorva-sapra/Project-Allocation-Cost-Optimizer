import { TestBed } from '@angular/core/testing';

import { CostOptimizationService } from './cost-optimization.service';

describe('CostOptimizationService', () => {
  let service: CostOptimizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostOptimizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
