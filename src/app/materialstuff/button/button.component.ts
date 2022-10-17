import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';
import { DynamicFormComponent } from 'src/app/components/cIndex';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  field: FieldConfig | any;
  group: FormGroup | any;
  function: any;
  FieldInfo: any;
  // addBeneficiaryOwners: any
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.field);
  }

  
  callFunction(functionName: string) {
    if (functionName === 'addBeneficiaryOwners()') {
      this.outputEvent.emit({ addBeneficiaryOwners: true });
    }
  }
}
