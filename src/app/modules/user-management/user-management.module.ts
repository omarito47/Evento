import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { UserManagementRoutingModule } from './user-management-routing.module';


import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserFormComponent } from './components/user-form/user-form.component';
@NgModule({
  declarations: [
    ListeUserComponent,
    ViewUserComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,


    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularSplitModule ,

    TableModule,
    ButtonModule,
    FormsModule



  ]
})
export class UserManagementModule { }
