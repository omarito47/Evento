import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeEventManagmentRoutingModule } from './type-event-managment-routing.module';
import { ListTypeEventComponent } from './component/list-type-event/list-type-event.component';
import { EventFormComponent } from './component/event-form/event-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTypeEventComponent,
    EventFormComponent
  ],
  imports: [
    CommonModule,
    TypeEventManagmentRoutingModule,
    FormsModule
  ]
})
export class TypeEventManagmentModule { }
