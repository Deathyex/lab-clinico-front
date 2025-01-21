import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  selector: 'app-buscador-usuarios',
  standalone: true,
  templateUrl: './buscador-usuarios.component.html',
  styleUrls: ['./buscador-usuarios.component.css'],
  imports: [FormsModule],
})
export class BuscadorUsuariosComponent {
  @Output() userSelected = new EventEmitter<any>();
  searchQuery: string = '';
  users: any[] = [];
  selectedUser: any = null;
  private searchSubject = new Subject<string>();
  private userService = inject(UserService);

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.search(query))
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
    this.selectedUser = user;
    this.searchQuery = user.name;
    this.users = [];

    this.userSelected.emit(user);
  }
}
