import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacity } from 'src/app/models/capacity/capacity.model';
import { CapacityService } from 'src/app/services/capacity.service';

@Component({
  selector: 'app-edit-capacity',
  templateUrl: './edit-capacity.component.html',
  styleUrls: ['./edit-capacity.component.scss']
})
export class EditCapacityComponent implements OnInit {
  id  : number;
  capacity : Capacity[]=[];
  fg : FormGroup;
  errorMessage :string;
  

  constructor(
    private _capacityService : CapacityService,
    private _builder : FormBuilder,
    private _route : ActivatedRoute, //récupère les informations de l'url (paramètres)
    private _router : Router //permet la navigation entre les pages
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.fg = this._builder.group({name : ['',Validators.required]});
    this._capacityService.getById(this.id).subscribe(data => this.capacity = data);
  }

  onSubmit(){
    if(this.fg.invalid){
      return;
    }

    this._capacityService.update(this.id, this.fg.value)
        .subscribe({
          next: () => {
            this._router.navigate(['/capacity']);
          },
        error : error => {
          this.errorMessage = error;
          console.log(this.errorMessage);
        }
      });
  }



}
