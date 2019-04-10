# Installation Steps

Install packages then run

```
yarn
yarn start
```

or

```
npm install
npm start
```

# Integrations Steps

## **These steps are already implented in this project, this is a guidline for future projects.**

## Angular Project

Install [angular-react](https://github.com/Microsoft/angular-react), React , React DOM

    yarn add angular-react react react-dom

or

     npm install angular-react react react-dom

Install the React project and the wrapper in our case poc-react-app (app)and poc-react-components (wrapper)

    yarn add poc-react-app poc-react-components

In Angular’s project app.module import the AngularReactBrowserModule from @angular-react/core and use it instead of Angular’s Browser module

    import { AngularReactBrowserModule } from "@angular-react/core";
    ...

    @NgModule({
        imports: [
        AngularReactBrowserModule,
        ....
        ]
    })

],

In Angular's project app.module import the wrapper and add it in Ngmodule imports

    import { PocAppModule } from "poc-react-components";
    ...
    @NgModule({
        imports: [
            ...
            PocAppModule,
            ...
        ],

Add the react component (imported in the above step from the wrapper) to the desired angular component using its selector (<poc-react-app> in our case),
props can be passed to the React component, using normal Angular syntax

```
-----------dashboard.component.html-----------
    <poc-app-react
        [basketItems]="basketItems"
        (onStateChange)="onStateChange($event)"
    >
    </poc-app-react>

```

```
-----------dashboard.component.ts-----------
  initialState = {};
  reactState = this.initialState;

  onStateChange(state): void {
    this.reactState = state;
  }
```

Add all the routes that the React app has to the Angular routing module so that they point to an Angular component that hosts the React component (Like the one created in the above step)

```
const routes: Routes = [
  .....
  //Dashbord component hosts the react component
  { path: "dashboard", component: DashboardComponent },
  .....
];
```
