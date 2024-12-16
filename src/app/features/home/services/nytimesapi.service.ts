import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, catchError, debounceTime, Observable, of, switchMap} from 'rxjs';
import {Article} from '../models/article';



@Injectable({
  providedIn: 'root'
})
export class NytimesapiService {
  nyApiURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  private refreshTableSource = new BehaviorSubject<boolean>(true);
  refreshTable$:Observable<boolean> = this.refreshTableSource.asObservable();

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  triggerRefresh() {
    this.refreshTableSource.next(true);
  }

  public fetchArticles(page?: number, pageSize?: number ) {
    let httpParams = new HttpParams();

    if (page !== undefined && page !== null) {
      httpParams = httpParams.set('page', page);
    }
    if (pageSize !== undefined && pageSize !== null) {
      httpParams = httpParams.set('pageSize', pageSize);
    }


    return this._httpClient.get(this.nyApiURL, {params: httpParams}).pipe(
      switchMap(response => {
        return of(response)
      }),
      catchError(err => {
        return of(err);
      })
    );
  }

}
