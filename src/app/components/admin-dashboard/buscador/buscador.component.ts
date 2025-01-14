import { Component, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  of,
  Observable,
  catchError,
  map,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-buscador',
  standalone: true,
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  imports: [FormsModule],
})
export class BuscadorComponent {
  searchQuery: string = '';
  users: any[] = [];
  selectedUser: any = null; // Usuario seleccionado
  private searchSubject = new Subject<string>();
  private userService = inject(UserService);

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300), // Espera 300ms para evitar búsquedas innecesarias
        distinctUntilChanged(), // Ignora si el valor es el mismo que el anterior
        switchMap((query) => this.search(query)) // Cambia a la nueva búsqueda
      )
      .subscribe((users) => {
        this.users = users;
      });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  search(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }

    return this.userService.getAllUsers().pipe(
      map((users) =>
        users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      ),
      catchError((error) => {
        console.error('Error al obtener los usuarios:', error);
        return of([]);
      })
    );
  }

  selectResult(user: any): void {
    this.selectedUser = user; // Asigna el usuario seleccionado
    this.searchQuery = user.name; // Llena el input con el nombre del usuario seleccionado
    this.users = []; // Limpia los resultados
  }
}
