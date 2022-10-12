import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  field: FieldConfig | any;
  group: FormGroup | any;
  function : any;
  constructor() { }

  ngOnInit(): void {
  }

}
