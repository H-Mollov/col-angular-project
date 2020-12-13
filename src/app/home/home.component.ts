import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = this.cookie.get("name");

  constructor(
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
  }

}
