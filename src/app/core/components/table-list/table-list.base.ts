import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import {
  ViewChild,
  Directive,
  OnInit,
  signal,
} from '@angular/core';
import { ApiService } from '../../services/api.service';

/**
 * Class TableListBase
 */
@Directive()
export abstract class TableListBase<T> implements OnInit {
  /**
   * @var paginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * @var displayedColumns
   */
  displayedColumns: string[] = [];
  /**
   * @var dataSource
   */
  dataSource: any[] = [];
  /**
   * @var totalCount
   */
  totalCount = signal(0);
  /**
   * @var pageSizeOptions
   */
  pageSizeOptions: number[] = [10,20];
  /**
   * @var defaultPageSize
   */
  defaultPageSize = 10;
  /**
   * @var loading
   */
  loading = signal(false);
  /**
   * @var lang
   */
  lang: string = 'en';
  /**
   * @var filteOptions
   */
  filteOptions = {
    limit: 10,
    offset: 0,
  };

  /**
   * Class constructor
   * @param __service ApiService
   */
  constructor(protected __service: ApiService) {}

  /**
   * @oninit
   * - getListData
   */
  ngOnInit(): void {
    this.getListData(this.filteOptions);
  }

  /**
   *@description
    - get all list data based on filter
   * @param filteOptions
   */
  getListData(filteOptions: any): void {
    this.setLoading(true);
    this.__service.getAllByParams('list', filteOptions).subscribe({
      next: (res) => {
        this.dataSource = res.data;
        if(filteOptions.offset == 0)
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
   * - apply filter changes
   * @param event
   */
  applyFilter(event: any) {
    this.resetPagination(this.paginator);
    this.filteOptions.limit = this.defaultPageSize;
    this.filteOptions.offset = 0;
      this.filteOptions = { ...this.filteOptions, ...event };
    console.log(this.filteOptions);
    this.getListData(this.filteOptions);
  }

  /** Replace the current table data and optionally set total row count */
  setData(data: T[] = [], totalCount?: number) {
    this.dataSource = data;
    if (typeof totalCount === 'number') {
      this.totalCount.set(totalCount);
    }
  }

  /**
   * Common page change handler.
   * If an emitFn is provided it will be called with a normalized payload {pageIndex, pageSize}.
   */
  onPageChange(
    event: PageEvent,
  ) {
    debugger
    console.log(event);
    console.log(this.filteOptions);
    this.filteOptions = { ...this.filteOptions, offset: ((event.pageIndex || 0)  * event.pageSize), limit: event.pageSize }
    this.getListData(this.filteOptions);
    console.log(this.filteOptions);

    }

  /**
   * Reset paginator state (pageIndex -> 0 and pageSize -> defaultPageSize).
   * Accepts an optional `MatPaginator` instance (child usually has @ViewChild(MatPaginator) paginator).
   */
  resetPagination(paginator?: MatPaginator, pageSize = this.defaultPageSize) {
    if (!paginator) return;
    paginator.pageIndex = 0;
    paginator.pageSize = pageSize;
  }

  /** 
   * Toggle loading state 
   */
  setLoading(loading: boolean) {
    this.loading.set(loading);
  }

  /** Helper to build a PageEvent-like payload */
  buildPagePayload(pageIndex = 0, pageSize = this.defaultPageSize) {
    return { pageIndex, pageSize } as PageEvent;
  }

  getNoDataFoundMessage(): string {
    return 'No data available for this table.';
  }
}
