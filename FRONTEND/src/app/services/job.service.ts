import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private api =
    environment.apiUrl + '/jobs';

  constructor(
    private http: HttpClient
  ) {}

  getAllJobs() {
    return this.http.get<any[]>(
      this.api
    );
  }
}
