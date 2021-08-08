import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CountriesService} from "../countries/countries.service";
import {Currency} from "./currency";
import {CurrenciesService} from "./currencies.service";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = [];
  loading = true;
  columns: string[] = ['code', "name", "countries"];
  private currenciesSub!: Subscription;
  private countriesSub!: Subscription;

  constructor(
    private http: HttpClient,
    private countriesService: CountriesService,
    private currenciesService: CurrenciesService,
  ) {}

  ngOnInit(): void {
    this.currenciesSub = this.currenciesService.getAll().subscribe(
      currencies => {
        this.countriesSub = this.countriesService.getAll().subscribe(
          allCountries => {
            let currencyCountries = new Map<string, string[]>();
            allCountries.forEach(country => {
              let countries = currencyCountries.get(country.defaultCurrency);
              if (countries != undefined) {
                countries.push(country.name)
              } else {
                currencyCountries.set(country.defaultCurrency, [country.name])
              }
            })
            currencies.forEach(currency => {
              let countries = currencyCountries.get(currency.code);
              if (countries != undefined) {
                currency.countries = countries
              }
            })
            this.currencies = currencies
          }
        )
      });
  }

  ngOnDestroy(): void {
    if (this.currenciesSub) {
      this.currenciesSub.unsubscribe();
    }
    if (this.countriesSub) {
      this.countriesSub.unsubscribe();
    }
  }
}
