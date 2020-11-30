import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteComponent } from './autocomplete.component';
import { OptionService } from './option.service';
import { debounceTime, map } from 'rxjs/operators';


export interface Option {
    name: string;
    id: string;
};

@Component({
    selector: 'client-component',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
    public form: FormGroup;

    public optionList: any[];

    @ViewChild(AutoCompleteComponent)
    public autocompleteComponent: AutoCompleteComponent;

    constructor(
        public fb: FormBuilder,
        public optionService: OptionService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            option: ['', Validators.required]
        });
    }

    public onOptionSelected(option: Option) {
        this.autocompleteComponent.setInputValue(option.name);
        this.autocompleteComponent.hide();
    }

    public searchOptions(event: any = { query: '' }) {
        this.optionService
            .getOptions(event.query)
            .pipe(map((options: Option[]) => options.filter(op => op.name.includes(event.query))),
            debounceTime(150) // used for it to filter after the user stops typing for a while
            )
            .subscribe(
                list => {
                  this.optionList = list;
                }
            );
    }
}
