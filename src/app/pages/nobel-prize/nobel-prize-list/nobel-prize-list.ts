import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NobelPrizeFilter } from '../nobel-prize-filter/nobel-prize-filter';
import { ActivatedRoute, Router } from '@angular/router';
import { TableListBase } from '../../../core/components/table-list/table-list.base';
import { NobelPrizeService } from '../nobel-prize.service';

/**
 * Class NobelPrizeList
 */
@Component({
  selector: 'app-nobel-prize-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    NobelPrizeFilter,
  ],
  templateUrl: './nobel-prize-list.html',
  styles: [
    `
      #nobel-prize-list {
        margin: 20px;
        height: 72vh;
        overflow: auto;

        .visiblity{ 
          visibility: hidden;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NobelPrizeList extends TableListBase<any> {
  /**
   * @var - displayedColumns
   */
  override displayedColumns: string[] = [
    'awardYear',
    'category',
    'winers',
    'dateAwarded',
    'prizeAmount',
  ];

  /**
   * Class constructor
   * @param __router Router
   * @param __activeRoute ActivatedRoute
   * @param __service NobelPrizeService
   */
  constructor(
    private __router: Router,
    private __activeRoute: ActivatedRoute,
    protected override __service: NobelPrizeService
  ) {
    super(__service);
  }

  /**
   *@description
    - get all list data based on filter
   * @param filteOptions
   */
  override getListData(filteOptions: any): void {
    this.setLoading(true);
    this.__service.getAllByParams('nobelPrizes', filteOptions).subscribe({
      next: (res) => {
        this.dataSource = res.nobelPrizes;
        this.totalCount.set(res.meta.count);
        console.log(res);
      },
      complete: ()=>{
        this.setLoading(false);
      },
    });
  }

  /**
   * @description
   * - show more details view
   * @param id string
   */
  showMoreDetails(id: string): void {
    const url = this.__router.serializeUrl(
      this.__router.createUrlTree(['../laureates-profile', id], {
        relativeTo: this.__activeRoute,
      })
    );
    window.open(url, '_blank');
  }
}
