import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private user: UserService
  ) { }

  errorMessage = '';

  formHandler(formValue: { username: string, password: string }) {
    this.user.login(formValue).subscribe(
      {
        next: (data) => {
          
        },
        error: (err) => {

        }
      }
    )
  }
}
