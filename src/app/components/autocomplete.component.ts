import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    OnInit
} from '@angular/core';
import { BaseControlValueAccessor } from './base.control.value.accessor';
import { AutoComplete } from 'primeng/autocomplete';
import { Option } from './client.component';

@Component({
    selector: 'autocomplete',
    templateUrl: 'autocomplete.component.html',
    styleUrls: ['autocomplete.component.scss']
})
export class AutoCompleteComponent extends BaseControlValueAccessor
    implements OnInit, AfterViewInit {
    @Input()
    public size: 'S' | 'M' | 'L';

    @Input()
    public label: string;

    @Input()
    public isRequired = false;

    @Input()
    public field: string;

    @Input()
    public emptyMessage: string;

    @Input()
    public multiple = false;

    @Input()
    public selectedItemTemplate: TemplateRef<any>;

    @Input()
    public itemTemplate: TemplateRef<any>;

    public suggestionsList: Option[];

    @Input() set suggestions(value: any[]) {
      if (value) {
        this.suggestionsList = value;
        if (value.length === 1) {
          this.select(value[0]);
        }
      }
    }

    @Output()
    public completeMethod = new EventEmitter();

    @Output()
    public onFocus = new EventEmitter();

    @Output()
    public onSelect = new EventEmitter();

    @Output()
    public onClear = new EventEmitter();

    @Output()
    public onDropdownClick = new EventEmitter();

    @ViewChild('auto')
    public autocompleteComponent: AutoComplete;

    public selectedValue: string;

    public ngAfterViewInit() {
        if (this.autocompleteComponent.multiContainerEL) {
            this.autocompleteComponent.multiContainerEL.nativeElement.addEventListener(
                'click',
                this._openAutoComplete
            );
        }
        if (this.selectedItemTemplate) {
            this.autocompleteComponent.selectedItemTemplate = this.selectedItemTemplate;
        }
        if (this.itemTemplate) {
            this.autocompleteComponent.itemTemplate = this.itemTemplate;
        }
    }

    public hide() {
        this.autocompleteComponent.hide();
    }

    public setInputValue(value: any) {
        this.autocompleteComponent.inputEL.nativeElement.value = value;
    }

    public search(event, query) {
        this.autocompleteComponent.search(event, query);
    }

    public focusInput() {
        this.autocompleteComponent.focusInput();
    }

    public select(value: any) {
        if (!this.disabled) {
            if (this.multiple) {
                this.value.push(value);
            } else {
                this.value = value;
            }
            this.formControl.patchValue(this.value);
            this.onChange(this.value);
            this.onTouched();
            this.onSelect.emit(value);
        }
    }

    public clear() {
        if (this.multiple) {
            this.value = [];
        } else {
            this.value = null;
        }
        this.formControl.patchValue(this.value);
        this.onTouched();
        this.onChange(this.value);
        this.onClear.emit();
    }

    private _openAutoComplete = () => {
        this.autocompleteComponent.inputClick = true;
        this.autocompleteComponent.dropdownButton.nativeElement.click();
    }
}
