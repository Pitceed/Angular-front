import { NgModule} from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginPageComponent } from "../modules/auth/ui/pages/login/login-page.component";
import { SignupPageComponent } from "../modules/auth/ui/pages/signup/signup-page.component";
import { HomePageComponent } from "../modules/home-page/home-page.component";

const routes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    component: HomePageComponent
  }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
