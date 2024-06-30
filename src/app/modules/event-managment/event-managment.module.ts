import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventManagmentRoutingModule } from './event-managment-routing.module';
import { ListEveentComponent } from './component/list-eveent/list-eveent.component';
import { FormEveentComponent } from './component/form-eveent/form-eveent.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListEveentComponent,
    FormEveentComponent
  ],
  imports: [
    CommonModule,
    EventManagmentRoutingModule,
    FormsModule
  ]
})
export class EventManagmentModule { }
