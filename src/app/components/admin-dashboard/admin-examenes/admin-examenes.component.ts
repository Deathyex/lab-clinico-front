import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { ExamenesService } from '../../../services/examenes.service';
import { FormsModule } from '@angular/forms'; // Si usas [(ngModel)]
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-examenes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-examenes.component.html',
  styleUrls: ['./admin-examenes.component.css'],
})
export class AdminExamenesComponent implements OnInit {
  private examenesService = inject(ExamenesService);
  public examenes: any[] = [];
  public showCreateEditModal = false;
  public showConfirmDeleteModal = false;
  public isModalEditar = false;
  public examenAEliminar: any | null = null;
  public showToast = false;
  public tipoModal: 'success' | 'warning' | 'error' = 'success';
  public mensaje = '';

  examenToEdit = {
    id: '',
    name: '',
    description: '',
  };

  tempExamen = {
    id: '',
    name: '',
    description: '',
  };

  ngOnInit(): void {
    this.mostrarExamenes();
  }

  private mostrarExamenes(): void {
    this.examenesService.getAllExamenes().subscribe(
      (data) => {
        this.examenes = data;
      },
      (error) => {
        console.error('Error al obtener los exámenes:', error);
      }
    );
  }

  openCreateEditModal(isModalEditar: boolean, examen?: any): void {
    this.examenToEdit = { ...examen };
    this.isModalEditar = isModalEditar;
    this.tempExamen = examen
      ? { ...examen }
      : { id: '', name: '', description: '' };
    this.showCreateEditModal = true;
  }

  closeCreateEditModal(): void {
    this.showCreateEditModal = false;
  }

  openConfirmDeleteModal(examen: any): void {
    this.examenAEliminar = examen;
    this.showConfirmDeleteModal = true;
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
  }

  crearExamen(name: string, description: string): void {
    this.examenesService.createExamen(name, description).subscribe(
      () => {
        this.mostrarExamenes();
        this.closeCreateEditModal();
        this.mostrarToast('success', 'El examen fue creado con éxito')
      },
      (error) => {
        this.mostrarToast('error', 'No se pudo realizar esta acción')
        console.error('Error al crear el examen:', error);
      }
    );
  }

  editarExamen(id: string, name: string, description: string): void {
    if (name === this.examenToEdit.name && description === this.examenToEdit.description) {
      this.closeCreateEditModal();
      return this.mostrarToast('warning', 'No se realizó ningún cambio en el examen')
    }

    this.examenesService.updateExamen(id, name, description).subscribe(
      () => {
        this.mostrarExamenes();
        this.closeCreateEditModal();
        this.mostrarToast('success', 'El examen fue editado con éxito')
      },
      (error) => {
        this.mostrarToast('error', 'No se pudo realizar esta acción')
        console.error('Error al editar el examen:', error);
      }
    );
  }

  isExamValid(): boolean {
    return this.tempExamen.name.length >= 8 && this.tempExamen.description.length >= 8;
  }

  confirmDelete(): void {
    this.examenesService.deleteExamen(this.examenAEliminar.id).subscribe(
      () => {
        this.mostrarExamenes();
        this.closeConfirmDeleteModal();
        this.mostrarToast('success', 'El examen fue eliminado con éxito')
      },
      (error) => {
        this.mostrarToast('error', 'No se pudo realizar esta acción')
        console.error('Error al eliminar el examen:', error);
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
