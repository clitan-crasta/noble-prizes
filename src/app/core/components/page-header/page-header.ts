import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterModule],
  template: `<mat-toolbar id="page-header">
    <span class="app-name" routerLink="/">
      <mat-icon>emoji_events</mat-icon>
      Nobel Prize</span
    >
    <span class="spacer"></span>
    <button matIconButton matTooltip="refresh" (click)="relaodPage()">
      <mat-icon>refresh</mat-icon>
    </button>
  </mat-toolbar>`,
})
export class PageHeader {
  /**
   * @description
   * - relaod page
   * @note - added just as placeholder for header
   */
  relaodPage(): void {
    window.location.reload();
  }
}
