import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent implements OnInit {

  fg : FormGroup;
  errorMessage : string;

  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this.fg = this._builder.group({
      name: ['', Validators.required],
      birth_year: ['', Validators.required],
      ville: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.fg.invalid){
      return;
    }

    this._userService.add(this.fg.value)
        .subscribe({
          next:() =>{
            this._router.navigate(['/home']);
          },
          error: error =>{
            this.errorMessage = error;
            console.log(this.errorMessage)
          }
        });
  }

}
