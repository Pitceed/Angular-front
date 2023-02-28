import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MessagingService} from "../../../../services/messaging.service";


@Component({
  selector: 'chat-form-component',
  templateUrl: 'chat-form.component.html',
  styleUrls: ['chat-form.component.scss']
})
export class ChatFormComponent {

  @Input() title: string
  @Output() closeForm = new EventEmitter<string>()
  constructor( private readonly chatViewService: MessagingService) {}

  createNewChat(data: string) {
    if (this.title == 'personal') {
      this.chatViewService.createNewPersonalChat(data)
    } else if (this.title == 'group') {
      this.chatViewService.createNewGroupChat(data)
    }
    this.closeForm.emit('')
  }
}
