import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { EntryComponent } from './components/entry/entry.component';
import { EditingComponent } from './components/editing/editing.component';
import { CancellationComponent } from './components/cancellation/cancellation.component';

const routes: Routes = [
  { path: '', component: HistoryComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'editing', component: EditingComponent },
  { path: 'cancellation', component: CancellationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
