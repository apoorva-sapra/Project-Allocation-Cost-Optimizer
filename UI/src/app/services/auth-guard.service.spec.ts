import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  const authServiceServiceSpy = jasmine.createSpyObj<AuthService>('AuthService',['isAuthenticated']);
  const RouterServiceSpy = jasmine.createSpyObj<Router>('Router',['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceServiceSpy
        },
        {
          provide: Router,
          useValue: RouterServiceSpy
        }
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('disable routes other than login register if user is not logged in', () => {
    authServiceServiceSpy.isAuthenticated.and.returnValue(false);
    expect(service.canActivate()).toBeFalsy();
  });
  it('redirect to login route if user is not logged in', () => {
    authServiceServiceSpy.isAuthenticated.and.returnValue(false);
    service.canActivate();
    expect(RouterServiceSpy.navigate).toHaveBeenCalled();
  });
});
