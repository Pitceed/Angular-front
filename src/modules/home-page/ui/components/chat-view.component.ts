import { Component, Input, OnInit } from "@angular/core";
import { ChatInterface, MessageInterface } from "../../contracts/chat";
import { MessagingService } from "../../../../services/messaging.service";
import {ActivatedRoute} from "@angular/router";

@Component ({
  selector: 'app-chat-view-component',
  templateUrl: 'chat-view.component.html',
  styleUrls: ['chat-view.component.scss']
})
export class ChatViewComponent implements OnInit{

  public chat : ChatInterface;
  public messages: MessageInterface[] = [];
  public currentUserId = 0
  public currentChatId? : string

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const chatId = parseInt(params['chatId'])-1
      this.chat = this.chatViewService.getChatById(chatId)
      this.messages = this.chatViewService.getMessagesByChatId(chatId)
    })
  }

  constructor(
    private chatViewService: MessagingService,
    private activatedRoute: ActivatedRoute,

  ) { }
}
