import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';
  role = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    this.authService.register({

      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role

    }).subscribe({

      next: (res: string) => {

        alert(res);

        this.router.navigate(['/login']);
      },

      error: (err: any) => {

        console.log(err);

        alert('Registration Failed');
      }
    });
  }
}
