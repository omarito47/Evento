import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User = { name: '', email: '', password: '', age: 0, address: '', role: 'user' };
  isEditMode: boolean = false;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.user._id!, this.user).subscribe(() => {
        this.router.navigate(['/liste-user']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/liste-user']);
      });
    }
  }
}
