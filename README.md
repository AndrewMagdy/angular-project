# **Angular Host Project**: _React components inside an Angular host application POC_

## General Notes

### Aim

_This projects aims to use React Components inside an Angular project.
The project is based on Microsoft's react-angular project ([Github](https://github.com/Microsoft/angular-react))._

### Components

#### Angular Host: ([Github repo](https://github.com/AndrewMagdy/angular-project))

_An Angular project that hosts both React components and Angular components.
The angular components are based on Angular io's [example project](https://github.com/angular/angular/tree/master/aio/content/examples/toh-pt6)_

#### Thin Wrapper: ([Github repo,](https://github.com/AndrewMagdy/thin-wrapper) [npm package](https://www.npmjs.com/package/poc-react-components))

_A thin wrapper for the React components that maps inputs and outputs between the host Angular component and the child React component._

#### React Component: ([Github repo](https://github.com/AndrewMagdy/poc-react-app), [npm package](https://www.npmjs.com/package/poc-react-app))

_A sample React project that can be used as a standalone project, hosted inside another React project or hosted inside an Angular project using the Wrapper._

### Results

### Props and callbacks

The thin wrapper maps the inputs and outputs (callbacks) passed from the Angular application to the React component, which allows seamless integration.

Props are passed down from the Angular host to the React component in real time.

Callbacks are invoked from the React component and pass events to the Angular host.

### State

There are two approaches for state management

1. #### State management handled by the React component

   The redux store is persisted throughout Angular navigation (store is persisted, root React component is unmounted and remounted on navigation from an Angular component)

2. #### State management handled by the Angular host

   The Angular host can handle state management by passing down props, and the React component passing events up to the Angular host using callbacks. This approach has the drawback of having the two projects closely coupled.

We use the former approach in this project, since having the React component as a standalone self contained project was a goal of this POC.

### Routing

There are two approaches to route handling from withing the React component

1. #### Routing handled by the React component

   Routing will work normally for the React component, however Angular needs to be aware of all routes used by the React component in order for history and direct navigation to work [(Implementation)](#add-routes-to-the-Angular-host). Using this method navigation from a React component to an Angular component is not possible.

2. #### Routing handled by the Angular host

   A callback that is responsible for navigation is passed from the Angular host to the react component. The drawback of this method that on each navigation the root React component will be unmounted and remounted (might cause performance issues).

We use both approaches in this project the former method for internal navigation between React components and the latter for navigation from a React component to an Angular component.

### Performance

react-angular project provides benchmarks ([link](https://microsoft.github.io/angular-react/performance/angular))

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

#### Install dependencies

Install [angular-react](https://github.com/Microsoft/angular-react), react, react-dom

    yarn add angular-react react react-dom

or

     npm install angular-react react react-dom

Install the React project and the wrapper in our case poc-react-app (React application) and poc-react-components (wrapper)

There are multiple approaches to installing the modules

##### _From a registry_

Currently the npm registry is used, Nexus 3 or other registries are also possible (by specifying the registry in .npmrc / .yarnrc)

Currently

    yarn add poc-react-app poc-react-components

##### _From a Git repository_

Currently

    yarn add https://github.com/AndrewMagdy/thin-wrapper#poc-react-components-v0.1.3-gitpkg https://github.com/AndrewMagdy/poc-react-app

#### Use AngularReactBrowser

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

#### Import the thin wrapper

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

#### Add the React component

Add the react component (imported in the above step from the wrapper) to the desired angular component using its selector (<poc-react-app> in our case),
props can be passed to the React component, using normal Angular syntax

```JS
-----------dashboard.component.html-----------
<poc-app-react
  //Prop passed to the React component in real time.
  [angularTestProp]="angularTestProp"
   //Callback to handle navigation by the Angular application
  (angularNavigateTo)="navigateTo($event)"
  //Callback invoked by the React component on state change
  (onStateChange)="onStateChange($event)"
>
</poc-app-react>

```

```JS
-----------dashboard.component.ts-----------
  angularTestProp = "Hello World";
  reactState = {};

  onStateChange(state): void {
    this.reactState = state;
  }

  navigateTo(route): void {
    this.router.navigateByUrl(route);
  }
```

#### Add routes to the Angular host

Add all the routes that the React component can navigate to to the Angular routing module so that they point to an Angular component that hosts the React component (Like the one created in the above step)

```JS
const routes: Routes = [
  .....
  //Dashboard component hosts the react component
  //dashboard, items and basked are all routes used by the React component
  { path: "dashboard", component: DashboardComponent },
  { path: "items", component: DashboardComponent },
  { path: "basket", component: DashboardComponent },
  .....
];
```
