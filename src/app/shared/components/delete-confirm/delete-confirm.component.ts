import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

/*Services*/
import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'bonamondo-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  dataToDelete: any;
  constructor(
    public dialogRef: MdDialogRef<any>,
    private crud: CrudService
  ) {
    console.log(this.dialogRef);
    //this.dataToDelete = this.dialogRef._containerInstance.dialogConfig.data;
  }

  ngOnInit() {
  }
   
  delete() {
    let child: any;
    let idChildToDelete: any;
    let childRelated: any;
    
    let params = {
      child: this.dataToDelete.child,
      idChildToDelete: this.dataToDelete.idChildToDelete,
      childRelated: this.dataToDelete.childRelated
    }
    
    /*this.crud
    .delete(params)
    .then(() => {
      this.change.emit("vai rolar essa porra");
    }); // deleta o product Class no banco*/
    
    this.dialogRef.close();
  }
}
