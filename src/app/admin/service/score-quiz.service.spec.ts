import { TestBed } from '@angular/core/testing';

import { ScoreQuizService } from './score-quiz.service';

describe('ScoreQuizService', () => {
  let service: ScoreQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
