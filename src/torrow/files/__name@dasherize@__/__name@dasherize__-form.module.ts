import { NgModule } from "@angular/core";

import { VendorModule } from "@torrow/vendor";

import { <%= classify(name) %>FormComponent } from "./<%= dasherize(name) %>-form.component";

const DECLARATIONS = [
  <%= classify(name) %>FormComponent,
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [
    VendorModule,
  ],
})
export class <%= classify(name) %>FormModule { }
