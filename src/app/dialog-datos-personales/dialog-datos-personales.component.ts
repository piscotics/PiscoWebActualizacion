import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-datos-personales',
  templateUrl: './dialog-datos-personales.component.html',
  styleUrls: ['./dialog-datos-personales.component.css']
})
export class DialogDatosPersonalesComponent implements OnInit {

  public TitleModal : string ="";
  
  constructor() { }

  ngOnInit(): void {
  }

}
