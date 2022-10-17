import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';
import { DynamicFormComponent } from '../cIndex';

@Component({
  selector: 'app-dynamic-accordion',
  templateUrl: './dynamic-accordion.component.html',
  styleUrls: ['./dynamic-accordion.component.scss'],
})
export class DynamicAccordionComponent implements OnInit, OnChanges {
  // we need to create a variable fields types of FieldConfig Array. It describes the structure (fields and properties) of the form.
  // The field properties will be varying for different type of fields.
  @Input() fields: FieldConfig[] = [];
  @Input() actualFields: FieldConfig[] = [];
  @Input() userForm!: FormGroup;
  @Input() radioOption: any;
  @Output() radioOnChange = new EventEmitter();

  ObjectValues = Object.values;
  ObjectKeys = Object.keys;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent | any;

  constructor() {}

  ngOnChanges(changes: any): void {
    console.log("radioOption", this.radioOption);
    if (this.radioOption !== null && this.radioOption !== undefined) {
      if (this.radioOption.addBeneficiaryOwners === true) {
        this.fields.forEach((field: any) => {
          if (field.accordianLabel === 'BusinessOwnerDetail') {
            field.BusinessOwnerDetail.length = field.BusinessOwnerDetail.length -1;
            field.BusinessOwnerDetail.push(...this.getBusinessOwnerDetail());
            field.BusinessOwnerDetail.push({
              type: 'button',
              label: 'Add Beneficiary Owners',
              function: 'addBeneficiaryOwners()',
            });
          }
        });
      } else {
        this.fields = this.fields.filter(
          (field: any) => field.accordianLabel !== 'BusinessOwnerDetail'
        );
        setTimeout(() => {
          if (this.radioOption.value === 1 || this.radioOption.value === '1') {
            this.fields = JSON.parse(JSON.stringify(this.actualFields));
          }
          if (this.radioOption.value === 2 || this.radioOption.value === '2') {
            this.fields = JSON.parse(JSON.stringify(this.actualFields));
            this.fields.forEach((field: any) => {
              if (field.accordianLabel === 'BusinessOwnerDetail') {
                field.BusinessOwnerDetail = [
                  ...this.getBusinessOwnerDetail(),
                  ...this.getBusinessOwnerDetail(),
                  {
                    type: 'button',
                    label: 'Add Beneficiary Owners',
                    function: 'addBeneficiaryOwners()',
                  },
                ];
              }
            });
            // this.fields = JSON.parse(JSON.stringify(this.fields));
          }
        }, 200);
      }
    }
  }

  ngOnInit(): void {}

  radioOnChanged(event: any) {
    this.radioOnChange.emit(event);
  }

  identify(index: number, item: any) {
    return item.accordianLabel;
  }

  
  getBusinessOwnerDetail() {
    return [
      {
        name: 'firstName',
        label: 'FirstName',
        type: 'input',
        value: '',
        validations: [
          {
            name: 'required',
            required: true,
            message: 'First Name is required',
            maxLength: 23,
            errormaxLength: "maxlength",
            maxLengtherror: "Maximum Length is 23"
          },
        ],
      },
      {
        name: 'lastName',
        label: 'LastName',
        type: 'input',
        value: '',
        validations: [
          {
            name: "required",
            required: true,
            message: 'Last Name is required',
            maxLength: 23,
            errormaxLength: "maxlength",
            maxLengtherror: "Maximum Length is 23"
          },
        ],
      },
      {
        name: 'ssn',
        label: 'SSN',
        type: 'input',
        value: '',
        validations: [
          {
            name: 'required',
            required: true,
            message: 'SSN is required',
          },
        ],
      },
    ];
  }
}
