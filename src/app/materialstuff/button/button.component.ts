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

  addBeneficiaryOwners(e: any) {
    console.log(e);
    const addBeneficiaryOwners = e.target.value || 0;
    if (this.FieldInfo.length < addBeneficiaryOwners) {
      for (let i = this.FieldInfo.length; i < addBeneficiaryOwners; i++) {
        this.FieldInfo.push(
          this.fb.group({
            label: ['', Validators.required],
            name: ['', Validators.required],
          })
        );
        // this.FieldInfo.push(this.fb.array([]));
        // e.forEach((field: any)=>{
        //   if(field.name === field.name){
        //     const control = this.fb.control(field)
        //   }
        // })
      }
    } else {
      for (let i = this.FieldInfo.length; i >= addBeneficiaryOwners; i--) {
        this.FieldInfo.removeAt(i);
      }
    }
  }

  callFunction(functionName: string) {
    if (functionName === 'addBeneficiaryOwners()') {
      this.outputEvent.emit({ addBeneficiaryOwners: true });
    }
  }
}
