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
    items: {
      itemsList: [
        {
          id: 0,
          img:
            "https://images-na.ssl-images-amazon.com/images/I/71x3e0x%2BM2L._SL1382_.jpg",
          title: "iPhone",
          price: "1000$"
        },
        {
          id: 1,
          img:
            "https://images-na.ssl-images-amazon.com/images/I/81R%2B5Mv9jkL._SL1500_.jpg",
          title: "S9+",
          price: "900$"
        }
      ],
      isLoading: false,
      isError: false,
      errorMessage: ""
    },
    basket: {
      basketItems: [
        {
          id: 0,
          img:
            "https://images-na.ssl-images-amazon.com/images/I/71x3e0x%2BM2L._SL1382_.jpg",
          title: "iPhone",
          price: "1000$"
        }
      ],
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
    console.log(JSON.stringify(state));
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}
