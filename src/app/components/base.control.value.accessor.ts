import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    template: ''
})
export abstract class BaseControlValueAccessor
    implements ControlValueAccessor, OnInit {

    public disabled = false;

    public required = false;

    public value: any;

    public formControl: FormControl;

    constructor(@Optional() @Self() public controlDir: NgControl) {
      if (controlDir) {
        controlDir.valueAccessor = this;
      }
    }

    ngOnInit() {
        if (this.controlDir) {
            this.formControl = this.controlDir.control as FormControl;
            this.writeValue(this.formControl.value);
        }
    }

    get hasErrors() {
        return (
          this.formControl && this.formControl.invalid &&
            (this.formControl.dirty || this.formControl.touched)
        );
    }

    public onChange(newVal: any) {}
    public onTouched(_?: any) {}

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
