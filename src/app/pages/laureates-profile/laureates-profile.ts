import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LaureatesService } from './laureates.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';

/**
 * Class LaureatesProfile
 */
@Component({
  selector: 'app-laureates-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './laureates-profile.html',
  styleUrls: ['./laureates-profile.scss'],
})
export class LaureatesProfile implements OnInit {
  /**
   * var laureates
   */
  laureates: any;

  /**
   * @var profileData
   */
  profileData: any = null;

  /**
   * Class constructor
   * @param __service LaureatesService
   * @param __route ActivatedRoute
   */
  constructor(
    private __service: LaureatesService,
    private __route: ActivatedRoute
  ) {}

  /**
   * - ngOnInit
   */
  ngOnInit(): void {
    this.getInfoById(this.__route.snapshot.paramMap.get('id')!);
  }

  /**
   * Get initials for avatar
   */
  get initials(): string {
    const name = this.laureates?.fullName?.en || this.laureates?.fullName || '';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  /**
   * - getInfoById
   * @param id string
   */
  getInfoById(id: string): void {
    this.__service.getOneById(`laureate`, id).subscribe({
      next: (res) => {
        this.laureates = res[0];
      },
    });
  }
}
