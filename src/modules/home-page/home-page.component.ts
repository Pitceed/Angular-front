import { Component } from "@angular/core";
import { AuthManager } from "../auth/services/auth.manager";
import {ChatInterface} from "./contracts/chat";
import {log} from "util";

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})

export class HomePageComponent {
  public currentUserId = 0
  public currentChatId? : string

  public readonly mockMessagesArr =  [
    [
      {
        text: 'Chat N1',
        createdAt: '12.10.22',
        authorId: 0
      }
    ],
    [
      {
        text: 'Chat N2',
        createdAt: '12.10.22',
        authorId: 0
      }
    ],
    [
      {
        text: 'Chat N3',
        createdAt: '12.10.22',
        authorId: 0
      }
    ],
    [
      {
        text: 'Chat N4',
        createdAt: '12.10.22',
        authorId: 0
      }
    ],
    [
      {
        text: 'Chat N5 message',
        createdAt: '12.10.22',
        authorId: 0
      },
      {
        text: 'Chat N5 another message',
        createdAt: '12.10.22',
        authorId: 1
      },
      {
        text: 'Chat N5 another message again',
        createdAt: '12.10.22',
        authorId: 0
      }
    ],
    [
      {
        text: 'Chat N6',
        createdAt: '12.10.22',
        authorId: 0
      }
    ]
  ]

  public readonly mockChats = [
    {
      id: '1',
      title: 'Chat N1',
      imageUrl: 'https',
      lastMessage: {
        text: 'Chat N1 last',
        createdAt: '12.10.22',
        authorId: 0
      }
    },
    {
      id: '2',
      title: 'Chat N2',
      imageUrl: 'https',
      lastMessage: {
        text: 'Chat N2 last message',
        createdAt: '11.10.22',
        authorId: 1
      }
    },
    {
      id: '3',
      title: 'Chat N3',
      imageUrl: 'https',
      lastMessage: {
        text: 'Chat N3 last message',
        createdAt: '10.10.22',
        authorId: 0
      }
    },
    {
      id: '4',
      title: 'Chat N4',
      imageUrl: 'https',
      lastMessage: {
        text: 'Chat N4 last message',
        createdAt: '10.10.22',
        authorId: 1
      }
    },
    {
      id: '5',
      title: 'Chat N5',
      imageUrl: 'https',
      lastMessage: {
        text: 'Chat N5 last message',
        createdAt: '09.10.22',
        authorId: 0
      }
    },
    {
      id: '6',
      title: 'Chat N6',
      imageUrl: 'https',
      lastMessage: {
        text: 'Chat N6 last message',
        createdAt: '08.10.22',
        authorId: 1
      }
    }
  ]

  public constructor(
    private readonly authManager: AuthManager
  ) {}

  public selectChat(chat: ChatInterface) : void {
    this.currentChatId = chat.id
      console.log(this.currentChatId)
    for (let i = 0; i < this.mockMessagesArr[+this.currentChatId-1].length; i++) {
      console.log(this.mockMessagesArr[+this.currentChatId-1][i].text)
    }
  }
}
