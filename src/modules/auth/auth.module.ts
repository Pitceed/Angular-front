import { NgModule} from "@angular/core";
import { LoginPageComponent } from "./ui/pages/login/login-page.component";
import { SignupPageComponent } from "./ui/pages/signup/signup-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthManager } from "./services/auth.manager";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  exports: [
    LoginPageComponent,
    SignupPageComponent,
  ],
  declarations: [
    LoginPageComponent,
    SignupPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthManager
  ]
})
export class AuthModule {}
