import { NgModule} from "@angular/core";
import { LoginPageComponent } from "./ui/pages/login/login-page.component";
import { SignupPageComponent } from "./ui/pages/signup/signup-page.component";

@NgModule({
  exports: [
    LoginPageComponent,
    SignupPageComponent
  ],
  declarations: [
    LoginPageComponent,
    SignupPageComponent
  ]
})
export class AuthModule {}
