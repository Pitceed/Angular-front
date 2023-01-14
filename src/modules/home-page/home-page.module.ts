import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { ChatListItemComponent } from "./ui/components/chat-list-item.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "../shared/common.module";


@NgModule({
  exports: [
    HomePageComponent
  ],
  declarations: [
    HomePageComponent,
    ChatListItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],

})
export class HomePageModule {}
