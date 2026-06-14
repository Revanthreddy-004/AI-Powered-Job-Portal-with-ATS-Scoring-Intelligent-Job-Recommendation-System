import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-dashboard.html',
  styleUrl: './candidate-dashboard.css'
})
export class CandidateDashboard implements OnInit {

  applications: any[] = [];

  constructor(
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {

    const candidateId =
      localStorage.getItem('userId');

    console.log(
      'LOCAL STORAGE USER ID = ',
      candidateId
    );

    this.applicationService
      .getMyApplications(Number(candidateId))
      .subscribe({

        next: (data: any) => {

          console.log(
            'API RESPONSE = ',
            data
          );

          this.applications = data;

          console.log(
            'AFTER ASSIGN = ',
              this.applications
          );

        },

        error: (err: any) => {

          console.log(
            'DASHBOARD ERROR = ',
            err
          );

        }

      });

  }

}
