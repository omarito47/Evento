import { ListTypeEventComponent } from './component/list-type-event/list-type-event.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './component/event-form/event-form.component';

const routes: Routes = [
  { path: 'type-event', component: ListTypeEventComponent },
  { path: 'typeEvenement/add', component: EventFormComponent },
  { path: 'typeEvenement/edit/:id', component: EventFormComponent },
  { path: '', redirectTo: '/type-event', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeEventManagmentRoutingModule { }
