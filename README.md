# React components inside an Angular host application POC

## General Notes

### Aim

_This projects aims to use React Components inside an Angular project.
The project is based on Microsoft's react-angular project ([Github](https://github.com/Microsoft/angular-react))._

### Components

#### Angular Host project : ([Github repo](https://github.com/AndrewMagdy/angular-project))

_An Angular project that hosts both React components and Angular components.
The angular components are based on Angular io's [example project](https://github.com/angular/angular/tree/master/aio/content/examples/toh-pt6)_

#### The Wrapper project: ([Github repo,](https://github.com/AndrewMagdy/thin-wrapper) [npm package](https://www.npmjs.com/package/poc-react-components))

_A thin wrapper for the React components that maps inputs and outputs between the host Angular component and the child React component._

#### The React project: ([Github repo](https://github.com/AndrewMagdy/poc-react-app), [npm package](https://www.npmjs.com/package/poc-react-app))

_A sample React project that can be used as a standalone project, hosted inside another React project or hosted inside an Angular project using the Wrapper._

## Installation Steps

Install packages then run

```bash
yarn
yarn start
```

or

```bash
npm install
npm start
```

## Integrations Steps Walkthrough

_**These steps are already implented in this project. This is a walkthrough of these steps**_

### Angular Host Project

Install [angular-react](https://github.com/Microsoft/angular-react), react, react-dom

    yarn add angular-react react react-dom

or

     npm install angular-react react react-dom

Install the React project and the wrapper in our case poc-react-app (React application) and poc-react-components (wrapper)

    yarn add poc-react-app poc-react-components

In Angular’s project app.module import the AngularReactBrowserModule from @angular-react/core and use it instead of Angular’s Browser module

```JS
import { AngularReactBrowserModule } from "@angular-react/core";
...

@NgModule({
    imports: [
    AngularReactBrowserModule,
    ....
    ]
})

],

```
In Angular's project app.module import the wrapper and add it in Ngmodule imports

```JS
import { PocAppModule } from "poc-react-components";
    ...
    @NgModule({
        imports: [
            ...
            PocAppModule,
            ...
        ],
```

Add the react component (imported in the above step from the wrapper) to the desired angular component using its selector (<poc-react-app> in our case),
props can be passed to the React component, using normal Angular syntax

```JS
-----------dashboard.component.html-----------
    <poc-app-react
        [basketItems]="basketItems"
        (onStateChange)="onStateChange($event)"
    >
    </poc-app-react>

```

```JS
-----------dashboard.component.ts-----------
  initialState = {};
  reactState = this.initialState;

  onStateChange(state): void {
    this.reactState = state;
  }
```

Add all the routes that the React app has to the Angular routing module so that they point to an Angular component that hosts the React component (Like the one created in the above step)

```JS
const routes: Routes = [
  .....
  //Dashbord component hosts the react component
  { path: "dashboard", component: DashboardComponent },
  .....
];
```
