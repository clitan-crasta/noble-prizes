import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelPrizeFilter } from './nobel-prize-filter';

describe('NobelPrizeFilter', () => {
  let component: NobelPrizeFilter;
  let fixture: ComponentFixture<NobelPrizeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelPrizeFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelPrizeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
