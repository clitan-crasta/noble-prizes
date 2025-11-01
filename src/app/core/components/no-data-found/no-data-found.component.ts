import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-no-data-found',
  template: `
    <div class="no-data-container">
      <p>{{ message }}</p>
    </div>
  `,
  styles: [
    `
      .no-data-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 1.2rem;
        margin: 20px 0;
      }
    `,
  ],
})
export class NoDataFoundComponent {
  @Input() message: string = 'No data found.';
}
