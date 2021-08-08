import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {CountriesService} from "./countries.service";
import {Country} from "./model";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

export const countryFilter = (country: Country, name: string, currency: string) => {
  return country.name.toLowerCase().includes(name.toLowerCase()) &&
    country.defaultCurrency.toLowerCase().includes(currency.toLowerCase())
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnDestroy, AfterViewInit {
  dataSource!: MatTableDataSource<Country>;
  loading = true;
  columns: string[] = ['name', "defaultCurrency", "documents", "withdrawalMaximum"];
  private subscription!: Subscription;
  @ViewChild(MatSort) sort!: MatSort;
  private nameFilterValue = ""
  private currencyFilterValue = ""


  constructor(
    private http: HttpClient,
    private service: CountriesService
  ) {}

  ngAfterViewInit() {
    this.subscription = this.service.getAll().subscribe(
      countries => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(countries);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (country) => countryFilter(
          country, this.nameFilterValue, this.currencyFilterValue
        )
      });
  }

  applyFilter(eventTarget: any, property: string) {
    const value = (eventTarget as HTMLInputElement).value.trim().toLocaleLowerCase();
    if (property == 'name') {
      this.nameFilterValue = value
    } else {
      this.currencyFilterValue = value
    }
    this.dataSource.filter = this.nameFilterValue + this.currencyFilterValue;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
