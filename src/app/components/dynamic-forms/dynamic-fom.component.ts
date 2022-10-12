import {
  Component,
  EventEmitter,
  Input,
  KeyValueDiffers,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../app/models/form-fields';
import { ApiService } from '../../../app/service/api-service.service';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: any;
  @Input() groupName: any;
  @Input() accordianHeading: any;
  @Input() form!: FormGroup;

  panelOpenState = false;
  firstAccordian = false;
  keys: any;

  get values() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.keys = Object.values(this.fields)[1];
    //createControl Method inside the ngOnInit.
    //It creates the control dynamically and returns the FormGroup.
    this.form = this.createControl(this.keys);
    if (this.fields.panelOpenState != undefined) {
      this.firstAccordian = this.fields.panelOpenState;
    }
  }

  //To create formControl for each fields from the Config data
  createControl(fields: any) {
    const group = this.fb.group({});
    fields.forEach((field: any) => {
      if (field.type !== 'button' && field.type !== 'text') {
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      }
    });
    let groupName: any = Object.values(this.fields)[0];
    this.addFormGroup(
      this.fb.group({
        [groupName]: group,
      })
    );
    return group;
  }

  // Below method is add validations to dynamic control.
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach((valid: any) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  // Validation Method
  //To validate all form fields we need to use the below function.
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control: any = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  //To fetch the FormArray from the form
  get FieldInfo() {
    return this.form.get('fieldinfo') as FormArray;
  }

  //To push the generated formGroup to FormArray in the form
  addFormGroup(group: any) {
    this.FieldInfo.push(group);
  }

  // submit funtionality
  //If the form is valid, the parent submit method is fired otherwise validation errors will be displayed
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      // this.submit.emit(this.form.value);
      console.log(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  //Needs to develope

  // addBeneficiaryOwners(e: any) {
  //   const addBeneficiaryOwners = e.target.value || 0;
  //   if (this.FieldInfo.length < addBeneficiaryOwners) {
  //     for (let i = this.FieldInfo.length; i < addBeneficiaryOwners; i++) {
  //       this.FieldInfo.push(this.fb.group({}));
  //     }
  //   } else {
  //     for (let i = this.FieldInfo.length; i >= addBeneficiaryOwners; i--) {
  //       this.FieldInfo.removeAt(i);
  //     }
  //   }
  // }
}
