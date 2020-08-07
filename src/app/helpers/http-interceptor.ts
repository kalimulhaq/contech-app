import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'AUTH_TOKEN';
    const selfHost = request.url.match(environment.apiUrl);

    if (token && selfHost) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        let err = error;
        if (error.status === 401) { // Unauthorized Request
          if (location.pathname.indexOf('auth/login') === -1) {
            location.href = 'auth/login';
          }
        } else if (error.status === 0) { // Incomplete Request
          err = {
            statue: false,
            request_status: false,
            code: 0,
            message: 'The request is being interrupted. It may be due to Server Down or Internet Disconnected',
            error: {
              code: error.name || 'UNKNOWN_ERROR',
              detail: error,
              html: error,
            }
          };
        } else if (error.error && error.error.request_status) {
          err = error.error;
        }
        return throwError(err);
      })
    );
  }
}
