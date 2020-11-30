import { AutoCompleteComponent } from './autocomplete.component';
import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import { FormControl} from '@angular/forms';
import {of} from 'rxjs';
import {OptionService} from './option.service';
import {DebugElement} from '@angular/core';
import {ClientComponent, Option} from './client.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  let spy: jasmine.Spy;
  let service: OptionService;
  let de: DebugElement;
  let inputDe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientComponent, AutoCompleteComponent ],
      imports: [ BrowserAnimationsModule ],
      providers : [
        OptionService],
        schemas: [NO_ERRORS_SCHEMA]
    })

    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    inputDe = de.query(By.css('[data-test="autocomplete"]'));
    service = de.injector.get(OptionService);
    // mock the data that the service sends
    spy = spyOn(service, 'getOptions').and.returnValue( of(
      mockOptions));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*  it('should call the service when user clicks on the input', () => {
    const mockEmit = spyOn(component.completeMethod, 'emit');
    inputDe.triggerEventHandler('completeMethod', null);
    fixture.detectChanges();
    expect(mockEmit).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
  }); */


  it('should show the list when the user clicks on it', () => {
    inputDe.triggerEventHandler('onSelect', null);
    const mockEmit = spyOn(component.onDropdownClick, 'emit');
    inputDe.triggerEventHandler('onDropdownClick', null);
    fixture.detectChanges();
    expect(mockEmit).toHaveBeenCalled();
  });


  it('should associate the value to the form control when we click on an item on the list', () => {
    component.formControl = new FormControl();
    const formValue = mockOptions[0];
    const mockEmit = spyOn(component, 'select');
    inputDe.triggerEventHandler('onSelect', formValue);
    fixture.detectChanges();
    // check if component enters the select function
    expect(mockEmit).toHaveBeenCalled();
    expect(component.formControl.value).toEqual(formValue);
  });

  it('should emit event to filter results when we write something in the input field', () => {
    const mockEmit = spyOn(component.completeMethod, 'emit');
    const filterValue = 'fff';
    inputDe.nativeElement.value = filterValue;
    inputDe.nativeElement.dispatchEvent(new Event('input'));
    inputDe.triggerEventHandler('completeMethod', null);
    fixture.detectChanges();

    expect(mockEmit).toHaveBeenCalled();
    expect(inputDe.nativeElement.value).toContain(filterValue);
  });

});

export const mockOptions: Option[] =
  [
    { name: 'ddd', id: 'dasds' },
    { name: 'dda', id: 'vzxcx' },
    { name: 'ddf', id: 'grgrg' },
    { name: 'fff', id: 'rerer' },
    { name: 'ggg', id: 'bfrgr' }
  ];
