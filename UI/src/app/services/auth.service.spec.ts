import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { of, Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/of';

describe('AuthService', () => {
  let service: AuthService;
  const notificationServiceSpy = jasmine.createSpyObj<NotificationService>('NotificationService', ['info','error','warning','success']);
  const httpServiceSpy = jasmine.createSpyObj<HttpClient>('HttpClient',['get','post']);
  const RouterServiceSpy = jasmine.createSpyObj<Router>('Router',['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NotificationService,
          useValue: notificationServiceSpy
        },
        {
          provide: HttpClient,
          useValue: httpServiceSpy
        },
        {
          provide: Router,
          useValue: RouterServiceSpy
        }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should not register if user already exist', () => {
    //arrange
    let user=new User();
    user.id=1;
    user.email='kk@123.com';
    user.password='12345678';
    user.name='krishna';
    let u =new BehaviorSubject<User[]>([user]);
    spyOn(httpServiceSpy,'get').and.returnValue(u.asObservable());
    service.register(user);
    //act
    //assert
    pending();
    //expect(service).toBeTruthy();
  });
});
