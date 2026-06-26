import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Jobs } from './pages/jobs/jobs';
import { CandidateDashboard } from './pages/candidate-dashboard/candidate-dashboard';
import { RecruiterDashboard } from './pages/recruiter-dashboard/recruiter-dashboard';
import { AtsDashboard } from './pages/ats-dashboard/ats-dashboard';
import { Recommendations } from './pages/recommendations/recommendations';

export const routes: Routes = [

  {
    path:'',
    redirectTo:'jobs',
    pathMatch:'full'
  },

  {
    path:'login',
    component:Login
  },

  {
    path:'register',
    component:Register
  },

  {
    path:'jobs',
    component:Jobs
  },

  {
    path:'candidate-dashboard',
    component:CandidateDashboard
  },

  {
    path:'recruiter-dashboard',
    component:RecruiterDashboard
  },

  {
    path:'ats-dashboard',
    component:AtsDashboard
  },

  {
    path:'recommendations',
    component:Recommendations
  }

];
