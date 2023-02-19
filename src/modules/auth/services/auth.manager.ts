import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { filter, ReplaySubject, take, tap} from "rxjs";
import { toPromise } from "../../../utils/wrap-observable-with-promise";
import {UserInterface} from "../interfaces/user.interface";
import {Router} from "@angular/router";

@Injectable()
export class AuthManager {

  public readonly currentUser$ = new ReplaySubject<UserInterface>(1)
  public readonly accessToken$ = new ReplaySubject<string | null>(1)

  private readonly TOKEN_KEY = 'APP[accessToken]'
  // private readonly USER_KEY = 'user'

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.initialize()
  }

  private initialize() {

    this.accessToken$.next(
      window.localStorage.getItem(this.TOKEN_KEY)
    )
    /**
     * Подписка получает первое значение токена и автоматически отписуется
     */
    this.accessToken$.pipe(
      filter(Boolean),
      take(1),
    ).subscribe(async (token) => {
      if (token) {
        this.currentUser$.next(
          await this.getCurrentUser(token)
        )
      }
    })

    this.accessToken$.subscribe(accessToken => {
       window.localStorage.setItem(this.TOKEN_KEY, accessToken ?? '')
    })
  }

  public async getCurrentUser(token: string) {
     const response = await toPromise(
        this.http.get<UserInterface>(
           'http://localhost:3000/me', {
             headers: { Authorization: `Bearer ${token}` }
           }
        )
     )
    console.log(response)
    return response
  }

  public async login(email: string, password: string) {

    const response = await toPromise(this.http.post<TokensResponse> (
      'http://localhost:3000/login', { email, password }
    ))
    this.accessToken$.next(response.access_token)

    return true
  }

  public async register(email: string, password: string) {

    const response = await toPromise(this.http.post<TokensResponse>(
      'http://localhost:3000/register', { email, password }
    ))
    this.accessToken$.next(response.access_token)

    return true
  }

  public async logout() {
    await this.router.navigate([''])
    localStorage.clear()
  }
}

interface TokensResponse  {
  access_token: string
  refresh_token: string
}
