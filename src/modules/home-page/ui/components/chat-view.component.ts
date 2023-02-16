import { Component, Input, OnInit } from "@angular/core";
import { ChatInterface, MessageInterface } from "../../contracts/chat";
import { MessagingService } from "../../../../services/messaging.service";
import { ActivatedRoute } from "@angular/router";
import { AuthManager } from "../../../auth/services/auth.manager";
import {UserInterface} from "../../../auth/interfaces/user.interface";
@Component ({
  selector: 'app-chat-view-component',
  templateUrl: 'chat-view.component.html',
  styleUrls: ['chat-view.component.scss']
})
export class ChatViewComponent implements OnInit{

  public chat : ChatInterface;
  public mockMessages: MessageInterface[];
  public currentUser: UserInterface
  public currentChatId: string
  public response: any

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentChatId = params['chatId']
      this.authManager.currentUser$.subscribe(currentUserId => this.currentUser = currentUserId)
      console.log(this.currentChatId)
      this.getMessages()
    })
  }

  async getMessages() {
    this.mockMessages = await this.chatViewService.getMessagesByChatId(this.currentChatId)
  }

  async sendMessage(message: string) {
    if (message.trim() != '') {
    const response = await this.chatViewService.sendMessage(this.currentChatId, message, this.currentUser.id)
      if (response) {
        console.log("message sent with no problems")
      } else {
        console.log("there are some problems occurred in sending")
      }
    }
  }

  constructor(
    private authManager : AuthManager,
    private chatViewService: MessagingService,
    private activatedRoute: ActivatedRoute,
  ) { }
}
