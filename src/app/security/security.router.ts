import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './security.service';

@Injectable()
export class SecurityRouter implements CanActivate {
  /**
   * Constructor para el uso del service de seguridad
   */
  constructor(
    private securityServices: SecurityService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(state);
    if (this.securityServices.onSesion()) {
      return true;
    } else {
      this.router.navigate(['/Login']);
    }
  }
}
