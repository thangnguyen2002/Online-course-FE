import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarheadComponent } from './navbarhead.component';

describe('NavbarheadComponent', () => {
  let component: NavbarheadComponent;
  let fixture: ComponentFixture<NavbarheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
