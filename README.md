# InvoiceBuilderNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

======================================================================================================
Generate Module:-
ng g m shared/material --flat (no folder structure) -> Flag to indicate if a dir is created.
ng g m invoice-builder --routing --dry-run -> Run through without making any changes.(Trail running                                                 the cmd)
ng g m invoice-builder --routing -> Actually running/executing the cmd


Flex-Layout ->
AngularMaterial is not responsive, so we can use bootstrap with AngularMaterial, but bootstrap
is have package so not recommended to use AngularMaterial (but theortically we can use)

Flex-layout is simple 3rd party package which adds responsiveness to template.
Since it is light weight, so can easily be used with angular-material

npm install @angular/flex-layout@latest --save

documentation: https://github.com/angular/flex-layout/wiki/BreakPoints 


or use-> https://material.angular.io/cdk/layout/overview


------------------------------------------------------------------------------------------------
cli-
Service : $ ng g s invoices/services/invoice
Model : $ ng g class invoices/models/invoice
        $ ng g class invoices/models/createInvoice


------------------------------------------------------------------------------------------------
