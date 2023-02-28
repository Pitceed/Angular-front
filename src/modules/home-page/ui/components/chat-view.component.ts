import {Component, Input, OnInit, OnDestroy, ElementRef, ViewChild} from "@angular/core";
import { ChatInterface, MessageInterface } from "../../contracts/chat";
import { MessagingService } from "../../../../services/messaging.service";
import { ActivatedRoute } from "@angular/router";
import { AuthManager } from "../../../auth/services/auth.manager";
import { UserInterface } from "../../../auth/interfaces/user.interface";
import {log} from "util";
import {hostname} from "os";
@Component ({
  selector: 'app-chat-view-component',
  templateUrl: 'chat-view.component.html',
  styleUrls: ['chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  public chatMenuIsActive = false
  public chatTitle = ''
  public chat?: ChatInterface;
  public mockMessages: MessageInterface[];
  public currentUser: UserInterface
  public currentChatId: string
  public response: any

  @ViewChild('messageList')
  private messageListRef: ElementRef<HTMLElement>

  @ViewChild('messageInput')
  private messageInputRef: ElementRef


  constructor(
    private authManager : AuthManager,
    private chatViewService: MessagingService,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log(this)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentChatId = params['chatId']
      this.chatViewService.reloadChats$.next()
      this.getMessages()
      this.chatViewService.reloadMessages$.next()
      this.chatViewService.setCurrentChatId(params['chatId'])
      this.authManager.currentUser$.subscribe(currentUserId => this.currentUser = currentUserId)
      this.chatViewService.getChats().subscribe(chats => {
        for (let chat of chats) {
          if (chat.id == this.currentChatId) {
           this.chatTitle = chat.title
          }
        }
      })
    })
  }

  getMessages(): void{
    //this.mockMessages = await this.chatViewService.getMessagesByChatId(this.currentChatId)
    this.chatViewService.getMessages().subscribe(messages => this.mockMessages = messages)
  }

  openChatMenu() {
    this.chatMenuIsActive = true
  }

  async sendMessage(message: string) {

    console.log(this.onScrollMove())
    if (message.trim() != '') {
      await this.chatViewService.sendMessage(this.currentChatId, message, this.currentUser.id)
    }
    this.chatViewService.reloadMessages$.next()
    setTimeout(() => this.messageListRef.nativeElement.scrollTo(
      {left: 0,
              top: this.onScrollMove(),
              behavior: "smooth"
      }
    ), 50)
    console.log(this.messageInputRef.nativeElement)
    this.messageInputRef.nativeElement.value = ''
  }

  onScrollMove() {
    let maxScrollHeight = (this.messageListRef.nativeElement.scrollHeight -
      this.messageListRef.nativeElement.offsetHeight)

    return maxScrollHeight
  }
}
