import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ConfirmboxComponent } from 'src/app/components/shared/confirmbox/confirmbox.component';
import { Capacity } from 'src/app/models/capacity/capacity.model';
import { CapacityService } from 'src/app/services/capacity.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  capacities : Capacity[];
  capacity : Capacity;
  fg : FormGroup;

  constructor(
    private _capacityService : CapacityService,
    private _router : Router,
    private _dialogService : NbDialogService,
    private _builder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.fg = this._builder.group({
      capacity:['',Validators.required]
    })
    this._capacityService.getAll().subscribe(capacities => this.capacities = capacities)
  }

  onSubmit(){
    if(this.fg.invalid){
      return;
    }

    this._capacityService.add(this.fg.value)
        .subscribe({
          next : () => {
            this._capacityService.getAll().subscribe(capacities => this.capacities = capacities)
          }
        })
  }

  toEdit(id : number){
    this._router.navigate([`editcapacity/${id}`]);
  }

  toDelete(id : number){
    let confirmBox = this._dialogService.open(ConfirmboxComponent, {
      context :{
        name : this.capacities.find(capacity => capacity.id == id).name
      },
      closeOnBackdropClick : false
    });
    confirmBox.onClose.subscribe(yesOrNo => {
      if(yesOrNo){
        this._capacityService.delete(id)
            .subscribe(() => this.capacities = this.capacities.filter(
                                                capacity => capacity.id !==id));
        this._router.navigate(['/capacity']);
      }
    });
  }

}
