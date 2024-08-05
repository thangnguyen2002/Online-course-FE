import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEarningComponent } from './admin-earning.component';

describe('AdminEarningComponent', () => {
  let component: AdminEarningComponent;
  let fixture: ComponentFixture<AdminEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
