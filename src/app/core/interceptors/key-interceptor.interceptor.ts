import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environment/environment';

@Injectable()
export class KeyInterceptor implements HttpInterceptor {
  today: Date = new Date();

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const formattedDate = this.formatDate(this.today);

    request = this.addParams(request, formattedDate, formattedDate);
    return next.handle(request);
  }

  private addParams(request: HttpRequest<any>, beginDate: string, endDate: string) {
    return request.clone({
      setParams: {
        'api-key': environment.api_key,
        'begin_date': beginDate,
        'end_date': endDate,
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  }
}
