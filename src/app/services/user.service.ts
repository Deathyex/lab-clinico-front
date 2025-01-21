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
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        birthDate: this.calcularEdad(user.birthDate)
      })))
    );
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
