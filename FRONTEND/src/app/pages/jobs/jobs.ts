import { Navbar } from '../../components/navbar/navbar';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { JobService }
from '../../services/job.service';

import { ApplicationService }
from '../../services/application.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule,Navbar],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})
export class Jobs implements OnInit {

  jobs: any[] = [];

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.jobService
      .getAllJobs()
      .subscribe({

        next: (data: any) => {

          console.log(
            'API DATA =',
            data
          );

          this.jobs = [...data];

          this.cdr.detectChanges();
        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

applyJob(jobId: number) {

  const candidateId =
    Number(localStorage.getItem('userId'));

  console.log('TOKEN = ',
    localStorage.getItem('token'));

  console.log('CANDIDATE ID = ',
    candidateId);

  console.log('JOB ID = ',
    jobId);

  this.applicationService
    .applyJob(candidateId, jobId)
    .subscribe({

     next: (res:any) => {

       console.log(res);

       alert(
         'Application Submitted Successfully'
       );

     },

      error: (err: any) => {

        console.log('FULL ERROR = ', err);

        console.log('STATUS = ', err.status);

        console.log('ERROR BODY = ', err.error);

        alert(
          'STATUS = ' + err.status
        );

      }

    });

}

}
