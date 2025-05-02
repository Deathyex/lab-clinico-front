import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { env } from './config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  baseUrl = env.baseUrl;

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/listAll`).pipe(
      map(users => users.filter(user => user.role !== 'ADMIN')),
      map(users => users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: this.calcularEdad(user.birthDate)
      })))
    );
  }

  updateUser(id: string,
    firstName: string,
    lastName: string,
    email: string,): Observable<any[]> {
    return this.http.patch<any[]>(`${this.baseUrl}/users/update/${id}`, {
      firstName,
      lastName,
      email,
    });
  }

  calcularEdad(fecha: string) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }
}