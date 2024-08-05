import { TestBed } from '@angular/core/testing';

import { AdminInstructorService } from './admin-instructor.service';

describe('AdminInstructorService', () => {
  let service: AdminInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
