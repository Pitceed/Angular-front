import { Component } from "@angular/core";
import { AuthManager } from "../../../auth/services/auth.manager";
import { ChatInterface } from "../../contracts/chat";
import { MessagingService } from "../../../../services/messaging.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {

  public isActive: boolean = false;
  public currentChatId?: string
  public chats: ChatInterface[] = [];
  public menuIsActive: boolean = false;

  ngOnInit() {
    this.getChats()
    this.chatViewService.reloadChats$.next()
  }

  getChats(): void {
    this.chatViewService.getChats().subscribe(chats => this.chats = chats)
  }

  public constructor(
    private readonly authManager: AuthManager,
    private chatViewService : MessagingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public selectChat(chat: ChatInterface) : void {
    const subscription = this.chatViewService.getChats().subscribe()
    subscription.unsubscribe()
    this.currentChatId = chat.id
    this.router.navigate([chat.id], {relativeTo: this.activatedRoute})
  }

  public openUserPanel() {
    this.menuIsActive = true
  }

  public closeUserPanel(event: boolean) {
    this.menuIsActive = false
  }
}
