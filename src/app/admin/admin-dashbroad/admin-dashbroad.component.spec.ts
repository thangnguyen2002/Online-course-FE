import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbroadComponent } from './admin-dashbroad.component';

describe('AdminDashbroadComponent', () => {
  let component: AdminDashbroadComponent;
  let fixture: ComponentFixture<AdminDashbroadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashbroadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
