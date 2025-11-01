import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelPrizeList } from './nobel-prize-list';

describe('NobelPrizeList', () => {
  let component: NobelPrizeList;
  let fixture: ComponentFixture<NobelPrizeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelPrizeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelPrizeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
