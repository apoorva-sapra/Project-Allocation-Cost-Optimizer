import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsCollecterComponent } from './requirements-collecter.component';

describe('RequirementsCollecterComponent', () => {
  let component: RequirementsCollecterComponent;
  let fixture: ComponentFixture<RequirementsCollecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsCollecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsCollecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
