import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRequirementComponent } from './role-requirement.component';

describe('RoleRequirementComponent', () => {
  let component: RoleRequirementComponent;
  let fixture: ComponentFixture<RoleRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
