import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/models/form-fields';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Output() outputEvent = new EventEmitter(); 
  field: FieldConfig | any;
  group: FormGroup | any;
  constructor() {}

  ngOnInit(): void {}

  onOptionSelect(event: any) {
    this.outputEvent.emit(event);
  }
}
