import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UsersService, User } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss'],
})
export class ListeUserComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UsersService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  editUser(id:any){
    const url = "users/edit/"+id
    this.router.navigateByUrl(url)
  }

  deleteUser(item: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(item).subscribe((res) => {
          Swal.fire({
            title: 'Supprimé !',
            text: 'Le utilisateur a été supprimé.',
            icon: 'success',
          }).then(() => {
            this.getAll();
          });
        });
      }
    });
  }
}
