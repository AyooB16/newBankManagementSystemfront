import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompteService } from './_services/compte.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private compteService: CompteService, private router: Router) { }

  canActivate(): Promise<boolean> {
    const token = this.compteService.getToken();

    if (!token) {
      this.router.navigate(['/user/login']);
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      this.compteService.getCompteByToken(token).subscribe(
        (compte: any) => {
          const isValidToken = !!compte;
          if (!isValidToken) {
            this.router.navigate(['/user/login']);
          }
          resolve(isValidToken);
        },
        (error) => {
          console.error('Error validating token:', error);
          this.router.navigate(['/user/login']);
          resolve(false);
        }
      );
    });
  }
}
