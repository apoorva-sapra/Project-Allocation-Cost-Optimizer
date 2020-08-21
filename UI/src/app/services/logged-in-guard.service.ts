import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['news-feed']);
      return false;
    }
    return true;
  }
}
