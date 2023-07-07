import { AbstractControl, ValidationErrors } from "@angular/forms";

export const peselValidator: (control: AbstractControl) => ValidationErrors | null = (control: AbstractControl):
  ValidationErrors | null => {
  if (!control.value || control.value.length === 0) {
    return null;
  }
  if (control.value.length !== 11) {
    return {pesel: control.value};
  }
  if (['00000000000'].includes(control.value)) {
    return {pesel: control.value};
  }

  let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(control.value.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(control.value.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    if ((10 - sum) % 10 === controlNumber) {
        return null;
    } else {
        return {pesel: control.value}
    }
};