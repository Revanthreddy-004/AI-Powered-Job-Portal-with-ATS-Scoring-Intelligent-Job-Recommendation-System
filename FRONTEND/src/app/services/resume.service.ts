import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    private http: HttpClient
  ) {}

  uploadResume(
      userId:number,
      file:File
  ){

      const formData =
          new FormData();

      formData.append(
          'file',
          file
      );

      return this.http.post(
          `http://localhost:8080/api/resume/upload/${userId}`,
          formData
      );

  }

}
