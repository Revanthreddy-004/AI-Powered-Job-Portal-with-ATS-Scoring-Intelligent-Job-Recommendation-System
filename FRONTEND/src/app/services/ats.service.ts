import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtsService {

  private api =
    'http://localhost:8080/api/ats';

  constructor(
    private http: HttpClient
  ) {}

  getScore(
    jobId:number,
    userId:number
  ){

    return this.http.get(
      `${this.api}/job/${jobId}/user/${userId}`
    );
  }
}
