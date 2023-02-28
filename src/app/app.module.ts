import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from "../modules/auth/auth.module";
import { AppRoutingModule } from "./app.routing-module";
import { ReactiveFormsModule } from "@angular/forms";
import {AuthGuard} from "../guards/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
