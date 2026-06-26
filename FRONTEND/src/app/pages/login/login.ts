import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService.login({

      email: this.email,
      password: this.password

    }).subscribe({

      next: (res: any) => {
          console.log('LOGIN RESPONSE:', res);

        localStorage.setItem(
          'token',
          res.token
        );

        localStorage.setItem(
          'userId',
          res.userId
        );

        localStorage.setItem(
          'role',
          res.role
        );

        localStorage.setItem(
          'name',
          res.name
        );

        alert('Login Successful');

        this.router.navigate(['/jobs']);


      },

      error: (err: any) => {

        console.log(
          'ERROR RESPONSE =',
          err
        );

        alert(
          JSON.stringify(err)
        );
      }
    });
  }
}
