import { Directive, Input,ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/form-fields';
import { CheckboxComponent, InputComponent, RadioComponent, SelectComponent, TextComponent, ButtonComponent } from '../materialstuff/MaterialIndex';


const compnentMapper: any = {
  input: InputComponent,
  select: SelectComponent,
  radio: RadioComponent,
  text: TextComponent,
  checkbox: CheckboxComponent,
  button: ButtonComponent
}

@Directive({
  selector: '[appFormFields]'
})
export class FormFieldsDirective {

  @Input() field: FieldConfig | any;
  @Input() group: FormGroup | any;

  componentRef: any;

  constructor(private resovler: ComponentFactoryResolver, private container: ViewContainerRef) { }

  ngOnInit(){
    const factory = this.resovler.resolveComponentFactory(compnentMapper[this.field.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field  = this.field;
    this.componentRef.instance.group = this.group;
  }

}
