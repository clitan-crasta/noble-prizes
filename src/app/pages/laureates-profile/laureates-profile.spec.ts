import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatesProfile } from './laureates-profile';

describe('LaureatesProfile', () => {
  let component: LaureatesProfile;
  let fixture: ComponentFixture<LaureatesProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaureatesProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaureatesProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
