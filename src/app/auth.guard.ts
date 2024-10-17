import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): MaybeAsync<GuardResult> {
  //   throw new Error('Method not implemented.');
  // }

  canActivate(): boolean {
    if (this.userService.getAuthStatus()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
