import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { observable, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = 'http://localhost:3000/users';
  private users: User[];

  constructor(private http: HttpClient, private notification: NotificationService,private router:Router) { }
  private fetchUsers() {
    this.http.get<User[]>(`${this.baseURL}`).subscribe(
      data => {
        this.users = data;
      }
    );
  }
  isAuthenticated(): boolean {
    return localStorage.token
  }

  getUsers() {
    return this.users;
  }

  login(email: string, password: string) {
    this.fetchUsers();
    let user = this.users.find(user => user.email == email && user.password == password);
    if (user) {
      let userData = { username: user.name, email: user.email }
      localStorage.setItem('token', JSON.stringify(userData));
      this.notification.success('Successfully logged in')
      this.router.navigate(['news-feed']);
    } else {
      this.notification.error('Invalid Credentials')
    }
  }
  logout() {
    if (localStorage.token) {
      localStorage.removeItem('token');
      this.notification.info('Logged out');
    } else {
      this.notification.warning('Can\'t logout');
    }
    this.router.navigate(['login']);
  }
  register(user: User){
    this.fetchUsers();
    if (this.users.find(u => u.email == user.email)) {
      this.notification.warning("User Already registered, Please login");
    } else {
      user.id = this.getNextId();
      return this.http.post<User>(this.baseURL, user);
    }

  }
  getNextId() {
    const max = Math.max.apply(null, this.users.map(item => item.id));
    return max + 1;
  }
}
