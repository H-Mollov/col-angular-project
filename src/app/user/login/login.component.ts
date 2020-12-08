import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private user: AuthService,
    private router: Router
  ) { }

  errorMessage = '';

  formHandler(formValue: { username: string, password: string }) {

    const userLogin = {
      login: formValue.username,
      password: formValue.password
    }
    
    this.user.login(userLogin).subscribe(
      {
        next: (data) => {
          this.router.navigate([`/home`]);
        },
        error: (err) => {
          console.error(err);
        }
      }
    )
  }
}
