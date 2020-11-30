import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientComponent } from './components/client.component';
import { OptionService } from './components/option.service';
import { AutoCompleteComponent } from './components/autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/input-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AutoCompleteComponent,
    InputContainerComponent
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [OptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
