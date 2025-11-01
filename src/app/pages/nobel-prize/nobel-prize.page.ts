import { Component } from '@angular/core';
import { NobelPrizeList } from './nobel-prize-list/nobel-prize-list';

@Component({
  selector: 'app-nobel-prize',
  standalone: true,
  template: `<section>
    <app-nobel-prize-list></app-nobel-prize-list>
  </section>`,
  imports: [NobelPrizeList],
})
export class NobelPrizePageComponent {}
