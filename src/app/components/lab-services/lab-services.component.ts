import { Component, inject, OnInit } from '@angular/core';
import { ExamenesService } from '../../services/examenes.service';

@Component({
  selector: 'app-lab-services',
  standalone: true,
  imports: [],
  templateUrl: './lab-services.component.html',
  styleUrl: './lab-services.component.css'
})
export class LabServicesComponent implements OnInit{

  private examenesService = inject(ExamenesService);
  public examenes: any[] = [];

  ngOnInit(): void {
    this.mostrarExamenes();
  }

  private mostrarExamenes(){
      this.examenesService.getAllExamenes().subscribe(
        (data) => {
          this.examenes = data;
        }
      );
  }

}
