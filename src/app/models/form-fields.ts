export interface Validator {
  name: string;
  validator: any;
  message: string;
  min?: number;
  max?: number;
  minLength?: boolean;
  maxLength?: boolean;
}

export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: any[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  formArrays?: any[];
  group?: number;
  function?: any;
}
