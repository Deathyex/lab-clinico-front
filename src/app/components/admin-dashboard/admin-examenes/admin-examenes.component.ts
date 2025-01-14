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

  examen = {
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
    this.isModalEditar = isModalEditar;
    this.examen = isModalEditar && examen ? examen : { id: '', name: '', description: '' };
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
      },
      (error) => {
        console.error('Error al crear el examen:', error);
      }
    );
  }

  editarExamen(id: string, name: string, description: string): void {
    this.examenesService.updateExamen(id, name, description).subscribe(
      () => {
        this.mostrarExamenes();
        this.closeCreateEditModal();
      },
      (error) => {
        console.error('Error al editar el examen:', error);
      }
    );
  }

  confirmDelete(): void {
    if (this.examenAEliminar) {
      this.examenesService.deleteExamen(this.examenAEliminar.id).subscribe(
        () => {
          this.mostrarExamenes();
          this.closeConfirmDeleteModal();
        },
        (error) => {
          console.error('Error al eliminar el examen:', error);
        }
      );
    }
  }
}
