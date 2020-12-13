import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorDisplayService {

  errorMessage = new BehaviorSubject<string>("");

  constructor() { }

  showErrorMessage(message: string) {
    this.errorMessage.next(message);
    this.hideErrorMessage();
  }

  hideErrorMessage() {
    setTimeout(() => {
      this.errorMessage.next("");
    }, 5000)
  }
}
