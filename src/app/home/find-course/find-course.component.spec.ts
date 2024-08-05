import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCourseComponent } from './find-course.component';

describe('FindCourseComponent', () => {
  let component: FindCourseComponent;
  let fixture: ComponentFixture<FindCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
