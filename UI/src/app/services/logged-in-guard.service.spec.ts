import { TestBed } from '@angular/core/testing';

import { LoggedInGuardService } from './logged-in-guard.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('LoggedInGuardService', () => {
  let service: LoggedInGuardService;
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
    service = TestBed.inject(LoggedInGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should disallow route to login and if user is already logged in', () => {
    authServiceServiceSpy.isAuthenticated.and.returnValue(true);
    expect(service.canActivate()).toBeFalsy();
  });
  it('should change route if user is already logged in', () => {
    authServiceServiceSpy.isAuthenticated.and.returnValue(true);
    service.canActivate();
    expect(RouterServiceSpy.navigate).toHaveBeenCalled();
  });
});