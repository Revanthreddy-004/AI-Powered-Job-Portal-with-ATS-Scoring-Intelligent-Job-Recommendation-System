import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl =
    environment.apiUrl + '/applications';

  constructor(
    private http: HttpClient
  ) {}

  applyJob(
    candidateId: number,
    jobId: number
  ) {

    return this.http.post(
      `${this.apiUrl}/apply`,
      null,
      {
        params: {
          candidateId,
          jobId
        }
      }
    );
  }

  getMyApplications(
    candidateId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/candidate/${candidateId}`
    );
  }
}
