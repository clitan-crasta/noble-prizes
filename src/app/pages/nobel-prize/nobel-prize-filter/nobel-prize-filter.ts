import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MY_FORMATS } from "../../../core/constants/date-formats.const";
import type { FilterFormValue } from "../../../core/models/filter-form.interface";
import { CATEGORY_OPTIONS } from "../../../core/constants/category-options.const";
import { provideNativeDateAdapter } from "@angular/material/core";

/**
 * class NobelPrizeFilter
 */

@Component({
  selector: "app-nobel-prize-filter",
  providers: [provideNativeDateAdapter(), provideMomentDateAdapter(MY_FORMATS)],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: "./nobel-prize-filter.html",
  styles: [
    `
      .nobel-prize-filter {
        margin: 20px;
        .form {
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .form {
            flex-direction: column;
          }
        }
      }
    `,
  ],
})
export class NobelPrizeFilter implements OnInit {
  /**
   * @var applyFilterEvent
   */
  @Output() applyFilterEvent: EventEmitter<FilterFormValue> =
    new EventEmitter<FilterFormValue>();

  /**
   * @var categoryList
   */
  readonly categoryList = CATEGORY_OPTIONS;

  /**
   * @var nobelPrizeFilter
   */
  nobelPrizeFilter!: FormGroup;
  /**
   * @var minYear
   */
  minYear = new Date(1900, 0, 1);

  /**
   * @var maxYear
   */
  maxYear = new Date();

  /**
   * Class constructor
   * @param __fb FormBuilder
   */
  constructor(private __fb: FormBuilder) {}

  /**
   * ngOnInit
   * - init form
   */
  ngOnInit(): void {
    this.initFilterForm();
  }

  initFilterForm(): void {
    this.nobelPrizeFilter = this.__fb.group({
      nobelPrizeYear: [null],
      yearTo: [null],
      nobelPrizeCategory: [null],
    });
  }

  /**
   * @description
   * - apply filter event emiter
   */

  applyFilter() {
    this.applyFilterEvent.emit(this.nobelPrizeFilter.value);
  }

  /**
   * @description
   * - fetch only year form date
   * @param normalizedYear Date
   * @param datepicker MatDatepicker
   * @param type 'start' | 'end'
   */
  chosenYearHandler(
    normalizedYear: Date,
    datepicker: MatDatepicker<Date>,
    type: "start" | "end"
  ) {
    const year = String(new Date(normalizedYear).getFullYear());
    if (type === "start") {
      this.nobelPrizeFilter.get("nobelPrizeYear")?.setValue(year);
    } else {
      this.nobelPrizeFilter.get("yearTo")?.setValue(year);
    }
    datepicker.close();
  }
}
