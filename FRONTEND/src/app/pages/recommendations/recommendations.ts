import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css'
})
export class Recommendations {

  jobs:any[] = [];

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){

    const userId =
      localStorage.getItem('userId');

    if(!userId){
      return;
    }

    this.http
      .get<any[]>(
        `http://localhost:8080/api/recommend/${userId}`
      )
      .subscribe({

        next:(res)=>{

          console.log(
            'RECOMMENDATIONS = ',
            res
          );

          this.jobs = res;

        },

        error:(err)=>{

          console.log(
            'ERROR = ',
            err
          );

        }

      });

  }

}
