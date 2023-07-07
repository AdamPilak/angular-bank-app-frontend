import { AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordValidator: (control: AbstractControl) => ValidationErrors | null = (control: AbstractControl):
  ValidationErrors | null => { 
  if (!control.value || control.value.length === 0) {
    return {pesel: control.value};
  }

  const regex = new Array();
      regex.push("[A-Z]");
      regex.push("[0-9]");
      regex.push("[$@$!%*#?&]");

  if ((new RegExp(regex[0]).test(control.value) && new RegExp(regex[1]).test(control.value) && new RegExp(regex[2]).test(control.value)) && control.value.length >= 8) {
    return null;
  } else {
    return {pesel: control.value};
  }
};