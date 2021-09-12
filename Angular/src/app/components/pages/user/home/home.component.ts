import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbTreeGridFooterCellDirective } from '@nebular/theme';
import { ConfirmboxComponent } from 'src/app/components/shared/confirmbox/confirmbox.component';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users : User[];

  constructor(
    private _userService : UserService,
    private _router : Router,
    private _dialogService : NbDialogService
    ) { }

  ngOnInit(): void {
    this._userService.getAll().subscribe(users => this.users = users);
  }

  toCreate(){
    this._router.navigate(['/register']);
  }

  toEdit(id: number){
    this._router.navigate([`edituser/${id}`])
  }

  toDelete(id: number){
    let confirmBox = this._dialogService.open(ConfirmboxComponent, {
      context :{
        name : this.users.find(user => user.id == id).name
      },
      closeOnBackdropClick : false
    });
    confirmBox.onClose.subscribe(yesOrNo => {
      if(yesOrNo){
        this._userService.delete(id)
            .subscribe(() => this.users = this.users.filter(
                                                user => user.id !==id));
        this._router.navigate(['/home']);
      }
    });
  }

}
