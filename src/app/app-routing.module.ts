import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneticMetricsComponent } from './components/genetic-metrics/genetic-metrics.component';
import { FileSelectionComponent } from './components/file-selection/file-selection.component';

const routes: Routes = [
  { path: '', component: FileSelectionComponent },
  { path: 'genetic_metrics/:file', component: GeneticMetricsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
