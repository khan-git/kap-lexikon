import { Component, OnInit, TemplateRef, Inject, HostListener } from '@angular/core';
import { PocketlistComponent } from './pocketlist/pocketlist.component';
import * as data from '../assets/sorted.json';
import { MatDialog, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';


export interface PocketData {
  nr: number,
  large: string [],
  small: string [],
  shade: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Kalle Ankas Pocket';
  pocketlist: any = (data as any).default;
  pocketData = {};
  itemsPerSlide = 4;
  numCols=6;
  numrows=6;
  rowHeight="110px";
  ownedPos = 0;
  owners = ['alla', 'ownerA', 'ownerB'];

  constructor(public dialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSize();
  }

  ngOnInit() {
    this.laddaData();
    this.updateSize();
  }

  updateSize() {
    this.numCols = Math.ceil(window.innerWidth/130);
    this.numrows = Math.ceil(window.innerHeight/110);
  }

  laddaData() {
    const data = localStorage.getItem('pocket-lexikon');
    if ( data != null) {
      this.pocketData = JSON.parse(data);
    }
    else {
      this.pocketData['ownerA']=[23, 29, 55, 65, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 212, 213, 214, 215, 216, 218, 219, 220, 221, 222, 223, 224, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 
      ];
      this.pocketData['ownerB']=[];
      this.pocketData['alla']=[];
    }
    if( ! ("double" in this.pocketData)) {
      this.pocketData["double"] = [];
      this.sparaData(null);
    }
  }

  sparaData($event) {
    localStorage.setItem('pocket-lexikon', JSON.stringify(this.pocketData));
  }

  getOwned() {
    return this.pocketData[this.owners[this.ownedPos]];
  }

  getDouble() {
    return this.pocketData["double"];
  }

  onSwipeDown(event) {
    if(this.ownedPos == 0) {
      this.ownedPos = this.owners.length-1;
    }
    else {
      this.ownedPos -= 1;
    }
  }

  onSwipeUp(event) {
    if(this.ownedPos == (this.owners.length -1)) {
      this.ownedPos = 0;
    }
    else {
      this.ownedPos += 1;
    }
  }

  openPocketModal() {
    const dialogRef = this.dialog.open(AppModalComponent, {
      data: this.pocketData
    });
  }

}

@Component({
  selector: 'app-pocketlistmodal',
  template: `{{datastring}}`
})
export class AppModalComponent {

  datastring: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public pocketdata: PocketData ) {
    this.datastring = JSON.stringify(pocketdata);
  }
}

