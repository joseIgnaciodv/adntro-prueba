import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChromosomeVariants,
  ChromosomeVariantsResponse,
} from '../models/chromosome-variants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  calculateCallRate(file: string) {
    let url = environment.apiURL + 'calculate_call_rate/' + file;
    return this.http.get(url, { responseType: 'text' });
  }

  calculateChromosomeVariants(
    file: string
  ): Observable<ChromosomeVariantsResponse> {
    let url = environment.apiURL + 'calculate_chromosome_variants/' + file;
    return this.http.get<ChromosomeVariantsResponse>(url);
  }

  saveResults(file: string) {
    let url = environment.apiURL + 'save_results/' + file;
    return this.http.get(url, { responseType: 'text' });
  }
}
