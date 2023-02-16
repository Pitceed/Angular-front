import { NgModule } from "@angular/core";
import { HomePageComponent } from "./ui/pages/home-page.component";
import { ChatListItemComponent } from "./ui/components/chat-list-item.component";
import { CommonModule } from "../shared/common.module";
import { ChatViewComponent } from "./ui/components/chat-view.component";
import { HomePageRoutingModule } from "./home-page.routing-module";
import {UserViewComponent} from "./ui/components/user-view.component";


@NgModule({
  exports: [
    HomePageComponent
  ],
  declarations: [
    HomePageComponent,
    ChatViewComponent,
    ChatListItemComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],

})
export class HomePageModule {}
