import { Component, Input, OnInit } from '@angular/core';
import { NbDialogModule, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss']
})
export class ConfirmboxComponent implements OnInit {

  @Input() name :string;

  constructor(private _dialogRef: NbDialogRef<ConfirmboxComponent>) { }

  ngOnInit(): void {
  }

  yes(){
    this._dialogRef.close(true);
  }

  no(){
    this._dialogRef.close(false);
  }

}
