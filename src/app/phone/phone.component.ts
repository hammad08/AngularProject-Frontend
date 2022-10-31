import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { Phone } from 'src/app/Models/phone';
import { State } from '../Models/BaseClass';


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  @Output() phoneDeleted = new EventEmitter<Phone>()
  @Output() phoneAdded=new EventEmitter<boolean>()
  @Input() public phoneModel: Phone = new Phone(1,"0333453245",1)
  constructor() { }
  ngOnInit(): void {
  }

  deletePhone(){
    this.phoneModel.stateEnum= State.Deleted;
    this.phoneDeleted.emit(this.phoneModel);
  }

  addPhone()
  {
    this.phoneAdded.emit(true);
  }

  changeState()
  {
    if(this.phoneModel.stateEnum==State.Added)
    {
      return;
    }
    else
    {
      this.phoneModel.stateEnum = State.Modified;
    }
  }

}
