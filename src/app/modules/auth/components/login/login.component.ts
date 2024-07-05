import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password : any
  email : any
  response : any
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login({email : this.email ,password: this.password}).subscribe(res=>{
      console.log(res);
      this.response = res
      localStorage.setItem("id" , this.response._id)
      localStorage.setItem("role" , this.response.role)
      if(this.response.role == 'user'){
        this.router.navigateByUrl("nav2")
      }else{
        this.router.navigateByUrl("liste-user")
      }
    })
  }

}
