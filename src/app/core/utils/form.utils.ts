import { FormGroup } from '@angular/forms';

export default class FormUtils {
  static getDirtyValues(form: FormGroup | any) {
    let dirtyValues = {};
    Object.keys(form.controls).forEach(key => {
      let control = form.controls[key];

      if (control.dirty) {
        if (control.controls)
          dirtyValues[key] = FormUtils.getDirtyValues(control);
        else dirtyValues[key] = control.value;
      }
    });

    return dirtyValues;
  }
}
