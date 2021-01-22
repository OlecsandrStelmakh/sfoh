import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor( private authService: AuthService,
               private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.authService.role.pipe(take(1),map( role => { 
        if (role) {
            return true;
        }
        return this.router.createUrlTree(['/auth'])
     }));
  }
}
