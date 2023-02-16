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
  public currentUserId = 0
  public currentChatId?: string
  public mockChats: ChatInterface[] = [];
  public menuIsActive: boolean = false;

  ngOnInit() {
    this.getChats()
  }

  getChats(): void {
    this.chatViewService.getChats().subscribe(mockChats => this.mockChats = mockChats)
  }

  public constructor(
    private readonly authManager: AuthManager,
    private chatViewService : MessagingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public selectChat(chat: ChatInterface) : void {
    this.currentChatId = chat.id
    this.router.navigate([chat.id], {relativeTo: this.activatedRoute})
  }

  public openUserPanel() {
    this.menuIsActive = !this.menuIsActive
  }
}
