import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  initialState = {
    basket: {
      basketItems: [{ name: "Item From Angular" }],
      isLoading: false,
      isError: false,
      errorMessage: ""
    }
  };
  modes = ["year", "decade"];
  showToday = true;
  mode = "year";

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  onStateChange(state): void {
    console.log(state);
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}
