import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbartopHomeComponent } from './navbartop-home.component';

describe('NavbartopHomeComponent', () => {
  let component: NavbartopHomeComponent;
  let fixture: ComponentFixture<NavbartopHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbartopHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbartopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
