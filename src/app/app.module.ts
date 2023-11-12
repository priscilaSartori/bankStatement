import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { EntryComponent } from './components/entry/entry.component';
import { EditingComponent } from './components/editing/editing.component';
import { CancellationComponent } from './components/cancellation/cancellation.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    EntryComponent,
    EditingComponent,
    CancellationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
