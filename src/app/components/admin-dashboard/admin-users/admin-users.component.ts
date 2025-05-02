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
  public showToast = false;
  public tipoModal: 'success' | 'warning' | 'error' = 'success';
  public mensaje = '';

  public tempUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  userToEdit = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  };

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

  openEditModal(user: any): void {
    this.userToEdit = { ...user };
    this.tempUser = { ...user }
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  editUser(id: string, firstName: string, lastName: string, email: string): void {
    if (firstName === this.userToEdit.firstName && lastName === this.userToEdit.lastName && email === this.userToEdit.email) {
      this.closeEditModal();
      return this.mostrarToast('warning', 'No se realizó ningún cambio en el usuario')
    }

    if (!(!/\d/.test(firstName) && !/\d/.test(lastName))) {
      // El firstName y lastName contienen números
      return this.mostrarToast('warning', 'El nombre y/o apellidos no pueden contener números.')
    }

    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      // El firstName y lastName contienen números
      return this.mostrarToast('warning', 'El email debe tener un formato válido.')
    }

    this.userService.updateUser(id, firstName, lastName, email).subscribe(
      () => {
        this.mostrarUsers();
        this.closeEditModal();
        this.mostrarToast('success', 'El usuario fue editado con éxito')
      },
      (error) => {
        this.mostrarToast('error', 'No se pudo realizar esta acción')
        console.error('Error al editar el usuario:', error);
      }
    );
  }

  mostrarToast(tipo: 'success' | 'warning' | 'error', mensaje: string): void {
    this.tipoModal = tipo;
    this.mensaje = mensaje;
    this.showToast = true;

    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast(): void {
    this.showToast = false;
  }
}
