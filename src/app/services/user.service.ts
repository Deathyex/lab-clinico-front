import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3777/api/v1/users/listAll').pipe(
      map(users => users.map(user => ({
        id: user.id,
        name: user.firstName + ' ' + user.lastName, // Asume que cada usuario tiene un atributo `name`
        email: user.email,
      })))
    );
  }  
}
