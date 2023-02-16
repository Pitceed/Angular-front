import { Component, OnInit } from "@angular/core";
import { AuthManager } from "../../../auth/services/auth.manager";
import {toPromise} from "../../../../utils/wrap-observable-with-promise";
@Component({
  selector: 'user-view-component',
  templateUrl: 'user-view.component.html',
  styleUrls: ['user-view.component.scss']
})

export class UserViewComponent implements OnInit{

  public userId: string;
  public userEmail: any;

  constructor(
    public readonly authManager: AuthManager
  ) {}
  ngOnInit() {

  }
}
