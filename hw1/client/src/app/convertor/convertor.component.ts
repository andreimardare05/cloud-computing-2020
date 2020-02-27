import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  amount: number = 500;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  result: string = "-";
  localCurrency: string;
  toCurrency: string = "EUR";
  country: string = "UK";
  currencies: any;
  result_reverse: string = "-";
  oldValue

  constructor(public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((response) => {
      this.currencies = response;
      this.currencies = [...new Set(this.currencies.map((item: any) => {
        if (item.currencies[0].code && item.currencies[0].code.length === 3) {
          return item.currencies[0].code;
        }
      }))];
      this.currencies = this.currencies.sort();
      this.currencies.pop();
    })

    this.currencyService.getCurrencyIP().subscribe((response) => {
      console.log(response)
      this.localCurrency = response.currency.code;
      (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 15,
        center: [response.longitude, response.latitude]
      });
    })
  }
  submit(): void {
    this.currencyService.getResult(this.localCurrency, this.toCurrency, this.amount).subscribe((response) => {
      this.result = response.result;
    })
    this.currencyService.getResult(this.toCurrency, this.localCurrency, this.amount).subscribe((response) => {
      this.result_reverse = response.result;
    })
  }

  valueChange(): void {
    this.result = "-"
    this.result_reverse = "-"
  }
}
