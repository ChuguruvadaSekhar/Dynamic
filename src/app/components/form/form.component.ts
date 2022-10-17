//Import Validators, DynamicFormComponent, DynamicAccordionComponent and FieldConfig.
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';
import { ApiService } from '../../service/api-service.service';
import { DynamicAccordionComponent } from '../cIndex';
import { DynamicFormComponent } from '../cIndex';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  userForm = this.fb.group({
    fieldinfo: this.fb.array([]),
  });

  configData: FieldConfig[] | any;
  configHeading: any;
  submitted = false;
  radioOption: any;
  @Input() fields: FieldConfig[] | any;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  clickEventSubscription!: Subscription;
  navigationFlag: boolean = true;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnChanges(changes: any): void {}

  //Use @ViewChild decorator to inject a reference to dynamicform component.

  @ViewChild(DynamicAccordionComponent) form: DynamicAccordionComponent | any;

  ngOnInit(): void {
    if (this.navigationFlag == true) {
      this.apiService.getNewSample().subscribe((data: any) => {
        this.configData = data;
        this.configHeading = this.configData.productHeading;
      });
    }

    this.clickEventSubscription = this.apiService
      .getApiEvent()
      .subscribe((jsonName) => {
        this.configHeading = null;
        this.fetchJson(jsonName);
      });
  }

  fetchJson(jsonName: any) {
    if (jsonName === 'sample') {
      var formArray = this.userForm.get('fieldinfo') as FormArray;
      for (let i = formArray.length; i >= 0; i--) {
        formArray.removeAt(i);
      }
      this.apiService.getNewSample().subscribe((data: any) => {
        this.configData = data;
        this.configHeading = this.configData.productHeading;
      });
    } else {
    }
  }

  submitForm() {
    // debugger
    this.submitted = true;
    // this.form.submit();
    //stop here if form is invalid

    console.log('form', this.userForm);
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach((data: any) => {
        //debugger
        Object.values(data.controls).forEach((field: any) => {
          Object.values(field.controls).forEach((fields: any) => {
            console.log('fields', fields);
            Object.keys(fields.controls).forEach((userFields: any) => {
              const control: any = fields.get(userFields);
              control.markAsTouched({ onlySelf: true });
              console.log(userFields, control.value);
            });
          });
        });
      });
    }
  }


  onRest(){
    //reset whole form back to intial state
    this.submitted = false;
    this.userForm.reset();
  }

  


  radioOnChange(event: any) {
    this.radioOption = event.value || event;
  }
}
