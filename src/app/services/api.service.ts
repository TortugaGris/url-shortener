import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';

export interface CreateShortLinkResponse {
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createShortLink(url: string): Observable<string> {
    return this.http.post<CreateShortLinkResponse>(environment.apiUrl + '/short-link', {
      url,
    }).pipe(
      map((obj) => obj.slug),
      tap((obj) => console.log(obj)),
    );
  }
}
