import { FormControl, ValidatorFn } from '@angular/forms';

export class EditorBase {
  params: IEditorBase = {};
  /** Holds the cellEditors value, validators etc.. */
  control = new FormControl('');
  constructor() {}

  get placeholder() {
    return this.params.placeholder || '';
  }

  get tooltip() {
    const { hintMessage, validationMessages } = this.params || {};
    let message = '';
    if (this.control.errors) {
      let messages = [];
      let errorKeys = Object.keys(this.control.errors);
      for (const vM in validationMessages) {
        if (errorKeys.includes(vM)) {
          messages.push(validationMessages[vM]());
        }
      }
      message = messages.join('\n');
    } else if (hintMessage) {
      message = hintMessage;
    }
    return message;
  }
}

export interface IEditorBase {
  formElement?: any; // TODO: Decide on structure/type
  /** Hint text */
  hintMessage?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Form validators */
  validators?: ValidatorFn[];
  /** Form validation messages */
  validationMessages?: { [key: string]: () => string };
}
