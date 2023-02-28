import { Injectable } from "@angular/core";
import {CanActivate, CanActivateChild, Router} from "@angular/router";
import { AuthManager } from "../modules/auth/services/auth.manager";
import {toPromise} from "../utils/wrap-observable-with-promise";
import {tick} from "@angular/core/testing";
import {map} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authManager: AuthManager,
    private readonly router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    if (await toPromise(this.authManager.accessToken$)) {
        return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }

  //_canActivate() {
  //  return this.authManager.accessToken$.pipe(
  //    map(token => {
  //      if (token) {
  //        return true
  //      }
  //      return this.router.createUrlTree(['login'])
  //    })
  //  )
  //}
}
