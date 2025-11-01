import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LaureatesService extends ApiService {
  /**
   * Class constructor
   * @param __http HttpClient
   */
  constructor(protected override __http: HttpClient) {
    super(__http);
  }
}
