import { TestBed } from '@angular/core/testing';

import { UserMycourseService } from './user-mycourse.service';

describe('UserMycourseService', () => {
  let service: UserMycourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMycourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
