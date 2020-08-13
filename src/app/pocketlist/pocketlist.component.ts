import { Component, OnInit, Input, HostListener, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


export interface PocketData {
  nr: number,
  large: string [],
  small: string [],
  shade: boolean
}

@Component({
  selector: 'app-pocketlist',
  templateUrl: './pocketlist.component.html',
  styleUrls: ['./pocketlist.component.css']
})
export class PocketlistComponent implements OnInit {
  @Input() pocketlist: any;
  @Input() owned: Map<string, number[]>;
  @Input() included: number [] = [];
  @Input() double: number [] = [];
  @Input() editable: boolean = true;
  @Output() dataChanged = new EventEmitter<boolean>();

  numCols=6;
  numrows=6;
  rowHeight="130px";
  modalWidth = '600px';
  toggleEdit = false;
  toggleDoubleEdit = false;

  visibleList: any [];
  firstNumber = 0;

  constructor(public dialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSize();
  }

  ngOnInit() {
    this.updateSize();
    this.visibleList = this.pocketlist.slice(this.firstNumber, this.numCols*this.numrows+this.firstNumber);
  }

  isIncluded(nr) {
    if(this.included.length > 0) {
      return this.included.indexOf(nr) > -1? '1': '0.4'
    }
    return '1';
  }

  updateSize() {
    this.numCols = Math.ceil(window.innerWidth/110);
    this.numrows = Math.floor(window.innerHeight/130);
    if( this.numrows > 5 ) {
      this.numrows = 5;
    }
    this.visibleList = this.pocketlist.slice(this.firstNumber, this.numCols*this.numrows+this.firstNumber);   
  }

  nextPage() {
    this.firstNumber = this.firstNumber+this.numCols*this.numrows;
    if( (this.firstNumber+this.numCols*this.numrows) > this.pocketlist.length) { 
      this.firstNumber = this.pocketlist.length-1;
    }
    this.visibleList = this.pocketlist.slice(this.firstNumber, this.numCols*this.numrows+this.firstNumber);   
  }

  previousPage() {
    this.firstNumber = this.firstNumber-this.numCols*this.numrows;
    if( this.firstNumber < 0) { 
      this.firstNumber = 0; 
    }
    this.visibleList = this.pocketlist.slice(this.firstNumber, this.numCols*this.numrows+this.firstNumber);   
  }

  openPocketModal(pocket) {
    if(this.toggleEdit) {
      let pPos = this.included.indexOf(pocket.nr);
      if( pPos > -1 ) {
        this.included.splice(pPos, 1);
      }
      else {
        this.included.push(pocket.nr);
      }
      this.dataChanged.emit(true);
    }
    else {
      if(this.toggleDoubleEdit) {
        let pPos = this.double.indexOf(pocket.nr);
        if( pPos > -1 ) {
          this.double.splice(pPos, 1);
        }
        else {
          this.double.push(pocket.nr);
        }
        this.dataChanged.emit(true);  
      }
      else {
        pocket.width = 200;
        const dialogRef = this.dialog.open(PocketModalComponent, {
          data: pocket
        });
      }
    }
  }

  isDouble(nr) {
    return this.double.indexOf(nr) > -1;
  }

  onSwipeLeft(event) {
    this.nextPage();
  }

  onSwipeRight(event) {
    this.previousPage();
  }

}


@Component({
  selector: 'app-pocketlistmodal',
  templateUrl: './pocketmodal.component.html'
})
export class PocketModalComponent {

  imgWidth = 343;
  constructor(@Inject(MAT_DIALOG_DATA) public pocketdata: PocketData ) {
    if(window.innerWidth < 343 ) {
      this.imgWidth = 200;
    }
    else {
      this.imgWidth = 343;
    }
  }

}
