import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from "../modules/auth/auth.module";
import { AppRoutingModule } from "./app.routing-module";
import { ReactiveFormsModule } from "@angular/forms";
import { HomePageModule } from "../modules/home-page/home-page.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    AuthModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
