import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtsService } from '../../services/ats.service';

@Component({
  selector: 'app-ats-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ats-dashboard.html',
  styleUrls: ['./ats-dashboard.css']
})
export class AtsDashboard implements OnInit {

  score: any = null;

  constructor(
    private atsService:AtsService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){

    const userId =
      Number(localStorage.getItem('userId'));

    console.log("USER ID =", userId);

    this.atsService
      .getScore(1,userId)
      .subscribe({

        next:(res:any)=>{

          console.log("SUCCESS =",res);

          this.score = res;

          this.cdr.detectChanges();

        },

        error:(err)=>{

          console.log("ERROR =",err);

        }

      });

  }

}
