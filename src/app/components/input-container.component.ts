import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

export enum InputContainerComponentSelectors {
    inputLabel = 'input-label',
    inputErrors = 'form-input-error'
}

@Component({
    selector: 'input-container',
    templateUrl: 'input-container.component.html',
    styleUrls: ['input-container.component.scss'],
})
export class InputContainerComponent implements OnDestroy {
    @Input()
    public label: string;

    @Input()
    public rightLabel: string;

    @Input()
    public id: string;

    @Input()
    public isRequired = false;

    public selectors = InputContainerComponentSelectors;

    @Input()
    public control: AbstractControl;

    @Input()
    public isInvalid = false;

    private _subscriptions = new Subject();

    ngOnDestroy(): void {
        this._subscriptions.next();
        this._subscriptions.complete();
    }
}
