import { Address } from "src/app/Models/address";
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy,Output,EventEmitter } from '@angular/core';
import { Phone } from "src/app/Models/phone";
import { State } from "../Models/BaseClass";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {

  @Input() public addressModel: Address = new Address(1,"Home","katchery road","babar market","Lahore","Punjab","54000",1, [ new Phone(0,'',0)]);
  @Output() addressDeleted=new EventEmitter<Address>();
  @Output() addressAdded=new EventEmitter<boolean>();
  @Output() changeParentState= new EventEmitter<boolean>();
  private detector: ChangeDetectorRef;
  constructor(detector: ChangeDetectorRef) {
    this.detector = detector;
   }
  ngOnInit(): void {
    console.log(this.addressModel);
  }


  deletePhone(phone: Phone){
    this.detector.detectChanges();
  }

  remainingPhones(): Phone[]{
    return this.addressModel.phones.filter(a => a.stateEnum !== State.Deleted);
  }

  deleteAddress(){
   this.addressModel.stateEnum= State.Deleted;
   this.addressDeleted.emit(this.addressModel)
  }

  addPhone(status: boolean)
  {
    this.addressModel.phones.push(new Phone(0,'',0))
  }

  addAddress()
  {
    this.addressAdded.emit(true)
  }

  changeState()
  {
    this.addressModel.stateEnum= State.Modified;
    this.changeParentState.emit(true);
  }
  changeParentStatePhone(value: boolean)
  {
    this.addressModel.stateEnum= State.Modified;
    this.changeParentState.emit(true);
  }
}
