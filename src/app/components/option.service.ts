import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Option } from './client.component';

@Injectable({
    providedIn: 'root',
})
export class OptionService {
    public getOptions(query: string): Observable<Option[]> {
        return of([
            { name: 'option1', id: 'dasds' },
            { name: 'option2', id: 'vzxcx' },
            { name: 'option3', id: 'grgrg' },
            { name: 'option4', id: 'rerer' },
            { name: 'option5', id: 'bfrgr' }
        ]);
    }
}
