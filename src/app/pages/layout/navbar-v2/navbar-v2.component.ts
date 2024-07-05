import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-v2',
  templateUrl: './navbar-v2.component.html',
  styleUrls: ['./navbar-v2.component.scss']
})
export class NavbarV2Component implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('auth/login')
  }

}
