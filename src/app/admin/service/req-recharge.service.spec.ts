import { TestBed } from '@angular/core/testing';

import { ReqRechargeService } from './req-recharge.service';

describe('ReqRechargeService', () => {
  let service: ReqRechargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqRechargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
