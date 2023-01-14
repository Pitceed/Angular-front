import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthManager } from "../../../services/auth.manager";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: [
    '../shared.scss',
    'login-page.component.scss'
  ]
})
export class LoginPageComponent {

  //@ts-ignore
  public loginForm: FormGroup
  //@ts-ignore
  public authErrorMessage: number

  public constructor(
    private readonly router: Router,
    private readonly authManager: AuthManager
  ) {}

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      remember: new FormControl(false)
    })
  }

  public navigateToSignupPage() {
    return this.router.navigate(['/signup'])
  }

  public async submit() {

    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched()
    }
    const user = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password,
      remember : this.loginForm.value.remember,
    }
    try {
      await this.authManager.login(user.email, user.password)

      return this.router.navigate(['/home-page'])
    } catch (err) {
      //@ts-ignore
      this.authErrorMessage = err.status
      console.log('error message: ', this.authErrorMessage)
    }

  }

  public validate(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName)
    //@ts-ignore
    return control?.invalid && control?.errors[errorName] && control?.touched
  }
}
