import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  metrics: string = "Loading ...";
  constructor(public currencyService : CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getMetrics().subscribe((response) => {
      this.metrics = response;
      console.log(this.metrics)
    })
  } 
}
