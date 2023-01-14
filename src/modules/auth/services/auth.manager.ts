import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {filter, ReplaySubject, take, tap} from "rxjs";
import { toPromise } from "../../../utils/wrap-observable-with-promise";

@Injectable()
export class AuthManager {

  public readonly currentUser$ = new ReplaySubject(1)
  public readonly accessToken$ = new ReplaySubject<string | null>(1)

  private readonly TOKEN_KEY = 'APP[accessToken]'
  // private readonly USER_KEY = 'user'

  constructor(
    private readonly http: HttpClient
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
       console.log('accessToken$', accessToken)
       window.localStorage.setItem(this.TOKEN_KEY, accessToken ?? '')
    })
  }

  public async getCurrentUser(token: string) {
     return toPromise(
        this.http.get<string>(
           'http://localhost:3000/me', {
             headers: { Authorization: `Bearer ${token}` }
           }
        )
     )
  }

  public async login(username: string, password: string) {

    const response = await toPromise(this.http.post<TokensResponse> (
      'http://localhost:3000/login', { username, password }
    ))
    this.accessToken$.next(response.access_token)

    return true
  }

  public async register(username: string, password: string) {

    const response = await toPromise(this.http.post<TokensResponse>(
      'http://localhost:3000/register', { username, password }
    ))
    this.accessToken$.next(response.access_token)

    return true
  }
}

interface TokensResponse  {
  access_token: string
  refresh_token: string
}
