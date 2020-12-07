import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  displayFoodMenu = "display: none";
  displayDutiesMenu = "display: none";
  displayBillsMenu = "display: none";

  isLogged = this.authService.isLogged;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  logOutHandler(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['user/login']))
  }

  resetMenus(): void {
    this.displayFoodMenu = "display: none";
    this.displayDutiesMenu = "display: none";
    this.displayBillsMenu = "display: none";
  }

  displayFoodHandler(): void {

    this.resetMenus();

    if (this.displayFoodMenu === "display: none") {
      this.displayFoodMenu = "display: flex"
    } else {
      this.displayFoodMenu = "display: none"
    }
  }

  displayDutiesHandler(): void {

    this.resetMenus();

    if (this.displayDutiesMenu === "display: none") {
      this.displayDutiesMenu = "display: flex"
    } else {
      this.displayDutiesMenu = "display: none"
    }
  }

  displayBillsHandler(): void {

    this.resetMenus();

    if (this.displayBillsMenu === "display: none") {
      this.displayBillsMenu = "display: flex"
    } else {
      this.displayBillsMenu = "display: none"
    }
  }

}
