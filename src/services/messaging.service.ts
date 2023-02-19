import { Injectable } from "@angular/core";
import { Observable, of, switchMap} from "rxjs";
import {ChatInterface, MessageInterface} from "../modules/home-page/contracts/chat";
import { HttpClient } from "@angular/common/http";
import { toPromise } from "../utils/wrap-observable-with-promise";
import { AuthManager } from "../modules/auth/services/auth.manager";

@Injectable({
  providedIn:'root'
})

export class MessagingService {

  constructor(
      private readonly http: HttpClient,
      private readonly authManager: AuthManager
  ) {}

  getChats(): Observable<ChatInterface[]> {
    return this.authManager.currentUser$.pipe(
      switchMap(user => {
        if(!user) {
          return of([])
        }
        return this.getChatByUserId(user.id)
      })
    )
  }

  public async sendMessage(chatId: string, text: string, authorId: string) {
    console.log(chatId, text, authorId)
    const response = await toPromise(
      this.http.post('http://localhost:3000/message',
        {
          chatId: chatId,
          text: text,
          authorId: authorId
        })
    )
    return response
  }
  public async getMessagesByChatId(chatId: string) {
    console.log(chatId)
    const response = await toPromise(
      this.http.post('http://localhost:3000/messages-by-chatId',
        {chatId})
     )
    console.log(response)
    return response as MessageInterface[];
  }

  public async getChatByUserId(userId: string) {
    let response = await toPromise(
      this.http.post('http://localhost:3000/chats-by-userId',
        {userId}))
    return response as ChatInterface[]
  }
}

