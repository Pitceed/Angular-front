import { Injectable } from "@angular/core";
import { MOCK_CHATS } from "../modules/home-page/data/mock-chats";
import { Observable, of } from "rxjs";
import { ChatInterface } from "../modules/home-page/contracts/chat";
import { MOCK_MESSAGES_ARR } from "../modules/home-page/data/mock-messages";

@Injectable({
  providedIn:'root'
})

export class MessagingService {

  getChats(): Observable<ChatInterface[]> {
    return of(MOCK_CHATS);
  }

  getChatById(chatId: number) {
    return MOCK_CHATS[chatId];
  }

  getMessagesByChatId(chatId: number) {
    return MOCK_MESSAGES_ARR[chatId]
  }
}
