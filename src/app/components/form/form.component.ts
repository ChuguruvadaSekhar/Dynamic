//Import Validators, DynamicFormComponent, DynamicAccordionComponent and FieldConfig.
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';
import { ApiService } from '../../service/api-service.service';
import { DynamicAccordionComponent } from '../cIndex';
import { DynamicFormComponent } from '../cIndex';
import { Validators } from '@angular/forms';
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

  clickEventSubscription!: Subscription;
  navigationFlag: boolean = true;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnChanges(changes: any): void {}

  //Use @ViewChild decorator to inject a reference to dynamicform component.

  @ViewChild(DynamicFormComponent) form: DynamicAccordionComponent | any;

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
    this.submitted = true;

    //stop here if form is invalid

    if (this.userForm.invalid) {
      return;
    }

    // display form values on success
    console.log(this.userForm.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.configData.value, null, 4));
  }

  onReset() {
    // reset whole form back to intial state
    this.submitted = false;
    this.userForm.reset();
  }

  radioOnChange(event: any) {
    this.radioOption = event.value || event;
  }
}
