import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface FileInfo {
  name: string;
  extension: string;
  fileSize: string;
}

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss'],
})
export class FileSelectionComponent {
  files: FileInfo[] = [
    {
      name: 'genome_Christopher_Smith_v5_Full_20230926164611.txt',
      fileSize: '15.3 MB',
      extension: 'txt',
    },
    {
      name: 'genome_Marika_Forsythe_v4_Full_20240828221950.txt',
      fileSize: '14.2 MB',
      extension: 'txt',
    },
    {
      name: 'genome_Marlon_Brando_v5_Full_20240730224666.txt',
      fileSize: '15.6 MB',
      extension: 'txt',
    },
    {
      name: 'genome_Melinda_Chaperlo_v5_Full_20240730223601.txt',
      fileSize: '15.6 MB',
      extension: 'txt',
    },
  ];

  constructor(private router: Router) {}

  navigateToGeneticsMetrics(file: string) {
    this.router.navigate(['/genetic_metrics', file]);
  }
}
