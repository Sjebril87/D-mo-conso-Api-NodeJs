import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  id : number;
  user : User[]=[];
  fg : FormGroup;
  errorMessage : string;

  constructor(
    private _builder: FormBuilder,
    private _route : ActivatedRoute,
    private _router: Router,
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.fg = this._builder.group({
      name: ['', Validators.required],
      birth_year: ['', Validators.required],
      ville: ['', Validators.required]
    });
    this._userService.getById(this.id).subscribe(data => this.user = data);
  }

  onSubmit(){
    this._userService.update(this.id, this.fg.value)
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
