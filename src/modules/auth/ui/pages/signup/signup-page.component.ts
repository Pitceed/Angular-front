import { Component } from "@angular/core";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthManager} from "../../../services/auth.manager";

@Component({
  selector: 'app-signup-page',
  templateUrl: 'signup-page.component.html',
  styleUrls: [
    '../shared.scss',
    'signup-page.component.scss'
  ]
})
export class SignupPageComponent {

  //@ts-ignore
  public authErrorMessage: number
  //@ts-ignore
  public signupForm: FormGroup

  public constructor(
    private readonly authManager: AuthManager
  ) {}

  public ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      repeatPassword: new FormControl('', [
        (control: AbstractControl) => {
          return (this.signupForm?.get('password')?.value === control.value) ? null : {notEquall: true}
        }
      ]),
      remember: new FormControl(false)
    })
  }

  public async submit() {

    if (this.signupForm.invalid) {
      return this.signupForm.markAllAsTouched()
    }
    const user = {
      email : this.signupForm.value.email,
      password : this.signupForm.value.password,
      remember : this.signupForm.value.remember,
    }
    try {
      await this.authManager.register(user.email, user.password)
    } catch (err) {
      //@ts-ignore
      this.authErrorMessage = err.status
      console.log('error message: ', this.authErrorMessage)
    }
  }

  public validate(controlName: string, errorName: string) {
    const control = this.signupForm?.get(controlName)
    //@ts-ignore
    return control?.invalid && control?.errors[errorName] && control?.touched
  }

}
