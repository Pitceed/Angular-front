import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: [
    '../shared.scss',
    'login-page.component.scss'
  ]
})
export class LoginPageComponent {

  public constructor(
    private readonly router: Router,
  ) {}

  public navigateToSignupPage() {
    return this.router.navigate(['/signup'])
  }
}
