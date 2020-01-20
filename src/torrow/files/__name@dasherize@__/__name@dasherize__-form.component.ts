import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
} from "@angular/forms";

import { <%= classify(name) %>FormValue } from "./<%= dasherize(name) %>-form-value.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "tt-<%= dasherize(name) %>-form",
  templateUrl: "./<%= dasherize(name) %>-form.component.html",
})
export class <%= classify(name) %>FormComponent {
  public readonly formGroup: FormGroup;

  @Output()
  public readonly formSubmit = new EventEmitter<<%= classify(name) %>FormValue >();

  constructor() {
    this.formGroup = this.buildFormGroup();
  }

  public get controlControlOne(): AbstractControl | null {
    return this.formGroup.get("controlOne" as keyof <%= classify(name) %>FormValue);
  }

  private get formValue(): <%= classify(name) %>FormValue {
    return this.formGroup.value;
  }

  public onSubmit(): void {
    if(this.formGroup.valid && this.formGroup.dirty) {
    const formValue = this.formValue;

    this.formGroup.reset(formValue);

    this.formSubmit.emit(formValue);
  }
}

  private buildFormGroup(): FormGroup {
    return new FormGroup({
      controlOne: new FormControl(""),
    });
  }
}
