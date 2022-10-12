import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';




import {
  DynamicFormComponent,
  DynamicAccordionComponent,
  FormComponent,
} from '../app/components/cIndex';
import { FormFieldsDirective } from './directives/form-fields.directive';
import { ApiService } from './service/api-service.service';
import {
  InputComponent,
  TextComponent,
  CheckboxComponent,
  RadioComponent,
  SelectComponent,
  ButtonComponent
} from './materialstuff/MaterialIndex';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicAccordionComponent,
    FormComponent,
    FormFieldsDirective,
    InputComponent,
    TextComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [ApiService],
  //Added dynamically created components in entryComponents array. Angular to compile these components.
  entryComponents: [
    InputComponent,
    TextComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    ButtonComponent
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
