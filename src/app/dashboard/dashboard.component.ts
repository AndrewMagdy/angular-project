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
  initialState = {};

  reactState = this.initialState;
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  onStateChange(state): void {
    this.reactState = state;
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}
