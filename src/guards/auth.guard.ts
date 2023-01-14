import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {


  canActivate(): boolean {
    return true
  }
}
