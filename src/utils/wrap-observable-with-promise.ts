import { Observable } from 'rxjs'
import { config } from 'rxjs/internal/config'

/**
 * Function returns a Promise which resolves when any data comes to the Observable
 * Default Observable::toPromise method gives a Promise, but it resolves on complete state
 *
 * @param {Observable<T>} target
 * @return {Promise<T>}
 */
export function toPromise<T>(target: Observable<T>): Promise<T> {
    const promiseConstructor = config.Promise || Promise

    return new promiseConstructor((resolve, reject) => {
        target.subscribe((value) => resolve(value), (err: any) => reject(err))
    }) as Promise<T>
}
