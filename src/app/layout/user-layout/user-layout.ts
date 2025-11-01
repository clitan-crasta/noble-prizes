import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../core/components/page-header/page-header';
import { RouterOutlet } from '@angular/router';

/**
 * Class - UserLayoutComponent
 */

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.html',
  imports: [RouterOutlet, PageHeader],
})
export class UserLayoutComponent {}
