import {RouterModule, Routes} from "@angular/router";
import { HomePageComponent} from "./ui/pages/home-page.component";
import { ChatViewComponent} from "./ui/components/chat-view.component";
import {NgModule} from "@angular/core";
import {UserViewComponent} from "./ui/components/user-view.component";

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: ':chatId', component: ChatViewComponent }
    ],
  },
  { path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
