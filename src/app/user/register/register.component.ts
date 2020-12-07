import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private user: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formHandler(formData: {username: string, password: string}) {
    this.user.register(formData).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.router.navigate([`/user/login`]);
        },
        error: (err) => {
          console.error(err);
        }
      }
    )
  }
}
