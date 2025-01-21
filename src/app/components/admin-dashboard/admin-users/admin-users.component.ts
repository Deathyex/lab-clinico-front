import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  private userService = inject(UserService);
  public users: any[] = [];
  public usersFiltrados: any[] = [];
  public searchQuery: string = '';
  private searchSubject = new Subject<string>();
  public showEditModal = false;

  public tempUser: any = [];

  ngOnInit(): void {
    this.mostrarUsers();

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((query) => this.filtrarUsuarios(query))
      )
      .subscribe((users) => {
        this.usersFiltrados = users;
      });
  }

  private mostrarUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.usersFiltrados = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  private filtrarUsuarios(query: string): any[] {
    if (!query.trim()) {
      return this.users;
    }
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  openEditModal(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }
}
