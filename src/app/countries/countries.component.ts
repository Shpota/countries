import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from "./countries.service";
import {Country} from "./country";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  loading = true;
  columns: string[] = ['name', "defaultCurrency", "documents", "withdrawalMaximum"];
  private subscription: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private service: CountriesService
  ) {}

  ngOnInit(): void {
    this.subscription = this.service.getAll().subscribe(
      countries => {
        this.loading = false;
        this.countries = countries;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
