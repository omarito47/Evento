import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  myRegisterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myRegisterForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  register(){
    console.log(this.myRegisterForm.value)
  }

}
