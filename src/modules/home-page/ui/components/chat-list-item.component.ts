import { Component, Input } from "@angular/core";
import { ChatInterface } from "../../contracts/chat";

@Component({
  selector: 'app-chat-list-item',
  templateUrl: 'chat-list-item.component.html',
  styleUrls: ['chat-list-item.component.scss']
})
export class ChatListItemComponent {
  @Input()
  public chat: ChatInterface

  @Input()
  public isActive: boolean
}
