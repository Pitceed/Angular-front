import { NgModule } from "@angular/core";
import { HomePageComponent } from "./ui/pages/home-page.component";
import { ChatListItemComponent } from "./ui/components/chat-list-item.component";
import { CommonModule } from "../shared/common.module";
import { ChatViewComponent } from "./ui/components/chat-view.component";
import { HomePageRoutingModule } from "./home-page.routing-module";
import {UserViewComponent} from "./ui/components/user-view.component";
import {ChatFormComponent} from "./ui/components/chat-form.component";
import {MomentFormatPipe} from "./ui/pipes/moment-format.pipe";


@NgModule({
  exports: [
    HomePageComponent
  ],
  declarations: [
    HomePageComponent,
    ChatViewComponent,
    ChatListItemComponent,
    UserViewComponent,
    ChatFormComponent,
    MomentFormatPipe
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],

})
export class HomePageModule {}
