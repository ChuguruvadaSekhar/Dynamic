import {
  Component,
  EventEmitter,
  Input,
  KeyValueDiffers,
  OnChanges,
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
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() fields: any;
  @Input() groupName: any;
  @Input() userForm: any;
  @Input() accordianHeading: any;
  @Input() form!: FormGroup;
  @Input() radioOption: any;
  @Output() radioOnChange: EventEmitter<any> = new EventEmitter();


  panelOpenState = false;
  firstAccordian = false;
  keys: any;

  get values() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.keys = Object.values(this.fields)[1];
    console.log('hi', this.keys);
    //createControl Method inside the ngOnInit.
    //It creates the control dynamically and returns the FormGroup.
    this.form = this.createControl(this.keys);
    if (this.fields.panelOpenState != undefined) {
      this.firstAccordian = this.fields.panelOpenState;
    }
  }

  ngOnChanges(changes: any): void {
    this.fields = this.fields;
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
        console.log('Helo', field.name);
      }
    });
    let groupName: any = Object.values(this.fields)[0];
    console.log('groupName', groupName);
    this.addFormGroup(
      this.fb.group({
        [groupName]: group,
      })
    );
    console.log('group', group);
    return group;
  }

  // Below method is add validations to dynamic control.
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach((valid: any) => {
        if(valid.required){
          validList.push(Validators.required);
        }
        if(valid.maxLength){
          validList.push(Validators.maxLength(valid.maxLength));
        }
        
      });
      return Validators.compose(validList);
    }
    return null;
  }

  // Validation Method
  //To validate all form fields we need to use the below function.
  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach((field) => {
  //     const control: any = formGroup.get(field);
  //     control.markAsTouched({ onlySelf: true });
  //   });
  // }

  //To fetch the FormArray from the form
  get FieldInfo() {
    return this.form.get('fieldinfo') as FormArray;
  }

  //To push the generated formGroup to FormArray in the form
  addFormGroup(group: any) {
    this.FieldInfo.push(group);
  }

  

  //Needs to develope

  // addBeneficiaryOwners(e: any) {
  //   const addBeneficiaryOwners = e.target.value || 0;
  //   if (this.FieldInfo.length < addBeneficiaryOwners) {
  //     for (let i = this.FieldInfo.length; i < addBeneficiaryOwners; i++) {
  //       this.FieldInfo.push(
  //         this.fb.group({
  //           label: ['', Validators.required],
  //           name: ['', Validators.required],
  //         })
  //       );
  //       // this.FieldInfo.push(this.fb.array([]));
  //       // e.forEach((field: any)=>{
  //       //   if(field.name === field.name){
  //       //     const control = this.fb.control(field)
  //       //   }
  //       // })
  //     }
  //   } else {
  //     for (let i = this.FieldInfo.length; i >= addBeneficiaryOwners; i--) {
  //       this.FieldInfo.removeAt(i);
  //     }
  //   }
  // }

  outputEvent(event: any) {
    this.radioOnChange.emit(event);
  }
}
