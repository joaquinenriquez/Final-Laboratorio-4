import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class VerificarLoginGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.auth.datosUsuario.pipe(

      map(user => {

        if (!user) {
          this.router.navigate(['/login'])
          return false;
        }

        return true;
        
      })
    )
  }



}