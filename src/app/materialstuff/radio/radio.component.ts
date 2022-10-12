import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  field: FieldConfig | any;
  group: FormGroup | any;
  constructor() { }

  ngOnInit(): void {
  }

}
