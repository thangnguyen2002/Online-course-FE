import { TestBed } from '@angular/core/testing';

import { AdminLessonService } from './admin-lesson.service';

describe('AdminLessonService', () => {
  let service: AdminLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
