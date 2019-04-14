import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  angularTestProp = "Hello World";

  reactState = {};
  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
    this.getHeroes();
  }

  onStateChange(state): void {
    this.reactState = state;
}

  navigateTo(route): void {
    this.router.navigateByUrl(route);
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}
