import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceTableComponent } from './preference-table.component';

describe('PreferenceTableComponent', () => {
  let component: PreferenceTableComponent;
  let fixture: ComponentFixture<PreferenceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
