import {  AbstractControl, NgForm } from '@angular/forms';

declare module "@angular/forms/"  {
    interface NgForm {
      getAllControls(this:Form) : AbstractControl[];
    }
}
NgForm.prototype.getAllControls = function(this:NgForm) {
    let controls : AbstractControl[] = [];
    for(const field in this.form.controls) {
        const control: AbstractControl = this.form.get(field) as AbstractControl;
        controls.push(control);
    }
    return controls;
}