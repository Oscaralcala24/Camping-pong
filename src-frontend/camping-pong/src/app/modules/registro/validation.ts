import { AbstractControl } from '@angular/forms';
export class Validate {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('passwordConfirm').value;
     if (password != confirmPassword) {
         abstractControl.get('passwordConfirm').setErrors({
           MatchPassword: true
         })
    } else {
      return null
    }
  }
}