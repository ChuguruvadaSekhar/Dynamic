import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';
import { DynamicFormComponent } from '../cIndex';

@Component({
  selector: 'app-dynamic-accordion',
  templateUrl: './dynamic-accordion.component.html',
  styleUrls: ['./dynamic-accordion.component.scss']
})
export class DynamicAccordionComponent implements OnInit {

// we need to create a variable fields types of FieldConfig Array. It describes the structure (fields and properties) of the form.
// The field properties will be varying for different type of fields.
  @Input() fields:FieldConfig[] = [];
  @Input() userForm !:FormGroup;
  ObjectValues = Object.values;
  ObjectKeys = Object.keys;

  @ViewChild(DynamicFormComponent) form: DynamicAccordionComponent | any;

  constructor() { }

  ngOnInit(): void {
  }

}
