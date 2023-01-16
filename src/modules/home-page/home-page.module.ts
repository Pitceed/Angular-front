import { NgModule } from "@angular/core";
import { HomePageComponent } from "./ui/pages/home-page.component";
import { ChatListItemComponent } from "./ui/components/chat-list-item.component";
import { CommonModule } from "../shared/common.module";
import { ChatViewComponent } from "./ui/components/chat-view.component";
import { HomePageRoutingModule } from "./home-page.routing-module";


@NgModule({
  exports: [
    HomePageComponent
  ],
  declarations: [
    HomePageComponent,
    ChatViewComponent,
    ChatListItemComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],

})
export class HomePageModule {}
