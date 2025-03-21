import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Link, LinkSchema } from '../models/link.interface';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

export interface CreateShortLinkResponse {
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient,
    private _firestore: Firestore,
  ) { }

  createShortLink(url: string): Promise<string> {
    return firstValueFrom(this._http.post<CreateShortLinkResponse>(environment.apiUrl + '/short-link', {
      url,
    }).pipe(
      map((obj) => obj.slug),
      catchError((e, caught) => {
        console.error(e);
        return caught;
      }),
    ));
  }

  watchLinks(): Observable<Link[]> {
    const linksRef = collection(this._firestore, 'links');
    return collectionData(linksRef, {idField: 'id'}).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]);
      }),
      map((data) => data.map((link) => LinkSchema.parse(link))),
    );
  }
}
