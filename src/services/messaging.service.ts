import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  combineLatest, debounceTime,
  Observable,
  of,
  ReplaySubject,
  share,
  shareReplay,
  Subject,
  switchMap
} from "rxjs";
import {ChatInterface, MessageInterface} from "../modules/home-page/contracts/chat";
import { HttpClient } from "@angular/common/http";
import { toPromise } from "../utils/wrap-observable-with-promise";
import { AuthManager } from "../modules/auth/services/auth.manager";

@Injectable({
  providedIn:'root'
})

export class MessagingService {

  public readonly reloadChats$ = new Subject<void>()
  public readonly reloadMessages$ = new Subject<void>()
  // public readonly reloadMessages$ = new BehaviorSubject(null)

  constructor(
      private readonly http: HttpClient,
      private readonly authManager: AuthManager
  ) {
   // this.currentChatId$.subscribe(v => console.log(`currentChatId$`, v))
   // this.reloadMessages$.subscribe(v => console.log(`reloadMessages$`, v))
  }

  public readonly currentChatId$ = new ReplaySubject<string>(1)
  protected chats$: Observable<ChatInterface[]>
  protected messages$: Observable<MessageInterface[]>

  getMessages(): Observable<MessageInterface[]> {
    if (!this.messages$) {
      this.messages$ = combineLatest([
        this.currentChatId$,
        this.reloadMessages$,
      ]).pipe(
        debounceTime(10),
        switchMap(([chatId]) => {
          if (!chatId) {
            return of([])
          }
          return this.getMessagesByChatId(chatId)
        }),
        shareReplay(),
      )
    }
    return this.messages$
  }

  getChats(): Observable<ChatInterface[]> {
    if(!this.chats$) {
      this.chats$ = combineLatest([
        this.authManager.currentUser$,
        this.reloadChats$,
      ]).pipe(
        switchMap(([ user ]) => {
          if(!user) {
            return of([])
          }
          return this.getChatByUserId(user.id)
        }),
        shareReplay(),
      )
    }
    return this.chats$
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

  public async createNewPersonalChat(userId: string) {
    const me = await toPromise(await this.authManager.currentUser$)
    let myId  = me.id
    console.log(userId)
    const response = await toPromise(
      this.http.post('http://localhost:3000/personal-chat',
        { userId, myId }
      )
    )
    this.reloadChats$.next()
    return response
  }

  public async createNewGroupChat(title : string) {
    const me = await toPromise(await this.authManager.currentUser$)
    let myId  = me.id
    console.log(title)
    console.log(myId)
    const response = await toPromise(
      this.http.post('http://localhost:3000/group-chat',
        { title, myId }
      ))
    this.reloadChats$.next()
    return response
  }

  public getMessagesByChatId(chatId: string) {
    return this.http.post<MessageInterface[]>(
      'http://localhost:3000/messages-by-chatId',
      { chatId }
    )
  }

  public async getChatByUserId(userId: string) {
    let response = await toPromise(
      this.http.post('http://localhost:3000/chats-by-userId',
        {userId})
    )
    return response as ChatInterface[]
  }

  public setCurrentChatId(chatId: string) {
    this.currentChatId$.next(chatId)
  }
}

