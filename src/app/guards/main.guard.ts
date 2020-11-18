import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AppService} from '../services/components/app.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(
    private router: Router,
    private appService: AppService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appService.userInfo$.pipe(map(user => {
      if (!user) {
        this.router.navigate(['/landing']);
      }

      return !!user;
    }));
  }
}
