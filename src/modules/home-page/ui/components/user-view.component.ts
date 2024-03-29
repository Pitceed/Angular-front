import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { AuthManager } from "../../../auth/services/auth.manager";
import {toPromise} from "../../../../utils/wrap-observable-with-promise";
import {UserInterface} from "../../../auth/interfaces/user.interface";
import {Router} from "@angular/router";
import * as events from "events";
@Component({
  selector: 'user-view-component',
  templateUrl: 'user-view.component.html',
  styleUrls: ['user-view.component.scss']
})

export class UserViewComponent implements OnInit{

  @Input() isActive: boolean;
  @Output() closeUserPanel = new EventEmitter()

  public currentUser: UserInterface
  public newChatTitle: string

  constructor(
    public readonly authManager: AuthManager,
    public readonly router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUser()
  }

  async getCurrentUser() {
    await this.authManager.currentUser$.subscribe(user => this.currentUser = user)
  }

  async logout() {
    await this.authManager.logout()
  }

  switchTitle (title: string) {
    this.newChatTitle = title
  }

  closeChatCreating(event = '') {
    this.newChatTitle = ''
  }
}
