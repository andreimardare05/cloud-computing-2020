import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetricsComponent } from './metrics/metrics.component';
import { ConvertorComponent } from './convertor/convertor.component';

const routes: Routes = [
  {path: 'metrics', component: MetricsComponent},
  {path: '', component: ConvertorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
