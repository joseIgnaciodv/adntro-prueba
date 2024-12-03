import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChromosomeVariants } from 'src/app/models/chromosome-variants';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-genetic-metrics',
  templateUrl: './genetic-metrics.component.html',
  styleUrls: ['./genetic-metrics.component.scss'],
})
export class GeneticMetricsComponent implements OnInit {
  callRate: string = ''; // Calculo del call rate
  file: string | null = ''; // Fichero previamente seleccionado
  loadingCallRate: boolean = false; // Carga del calculo del call rate
  loadingVariants: boolean = false; // Carga del calculo de las variantes
  loadingExport: boolean = false; // Carga al exportar resultados
  showMessage: boolean = false; // Ocultar o mostrar mensage flotante
  chromosomeVariants: ChromosomeVariants[] = []; // Listado de cuantos variantes por cada cromosoma

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  formatFileName() {
    let formattedFile = '';
    let fileName = this.file!.split('_');
    formattedFile = fileName[1] + ' ' + fileName[2];

    return formattedFile;
  }

  navigateToFileSelection() {
    this.router.navigate(['/']);
  }

  getCallRate(file: string) {
    this.loadingCallRate = true; // Empezar la carga, inicializando la variable para mostrar el spinner en la vista
    this.data.calculateCallRate(file).subscribe((res) => {
      this.callRate = res; // Hacer la llamada al endpoint de calcular call rate, y guardar respuesta en variable callRate
      this.loadingCallRate = false; // Finalizar llamada al endpoint, ocultar spinner
    });
  }

  getChromosomeVariants(file: string) {
    this.loadingVariants = true; // Empezar la carga, inicializando la variable para mostrar el spinner en la vista
    this.data.calculateChromosomeVariants(file).subscribe((res) => {
      this.chromosomeVariants = res.response; // Hacer la llamada al endpoint de calcular variantes, y guardar respuesta en chromosomeVariants
      this.loadingVariants = false; // Finalizar llamada al endpoint, ocultar spinner
    });
  }

  saveResults() {
    this.loadingExport = true;
    this.data.saveResults(this.file!).subscribe((res) => {
      if (res == '200') {
        this.showMessage = true;
        this.loadingExport = false;

        setTimeout(() => {
          this.showMessage = false;
        }, 6000);
      } else {
        this.showMessage = false;
        this.loadingExport = false;
      }
    });
  }

  ngOnInit(): void {
    this.file = this.route.snapshot.paramMap.get('file'); // Obtener parametro de ruta "file"
    this.getCallRate(this.file!); // Calcular call rate, en base al fichero seleccionado
    this.getChromosomeVariants(this.file!); // Calcular variantes por cromosoma, en base al fichero seleccionado
  }
}
