import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizdetailComponent } from './admin-quizdetail.component';

describe('AdminQuizdetailComponent', () => {
  let component: AdminQuizdetailComponent;
  let fixture: ComponentFixture<AdminQuizdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminQuizdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuizdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
