import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Navbar
  ],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css'
})
export class RecruiterDashboard {

}
