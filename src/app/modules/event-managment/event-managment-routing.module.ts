import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEveentComponent } from './component/list-eveent/list-eveent.component';
import { FormEveentComponent } from './component/form-eveent/form-eveent.component';

const routes: Routes = [
  { path: 'evenements', component: ListEveentComponent },
  { path: 'evenement/add', component: FormEveentComponent },
  { path: 'evenement/edit/:id', component: FormEveentComponent },
  { path: '', redirectTo: '/evenements', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagmentRoutingModule { }
