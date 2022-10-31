import { Address } from "src/app/Models/address";
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy,Output,EventEmitter, ViewChild } from '@angular/core';
import { Phone } from "src/app/Models/phone";
import { State } from "../Models/BaseClass";
import { AbstractControl, NgForm } from "@angular/forms";
import 'src/app/extensions/ng-form.extentions';



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

  private detector: ChangeDetectorRef;
  controls: AbstractControl[] = [];

  constructor(detector: ChangeDetectorRef) {
    this.detector = detector;
   }
  ngOnInit(): void {
    console.log(this.addressModel);
  }

  deletePhone(phone: Phone){
    if(phone.phoneId==0)
    {
      let value= this.addressModel.phones.indexOf(phone);
      if(value> -1)
      {
        this.addressModel.phones.splice(value,1);
      }
    }
    console.log("After get All: "+ this.controls[0]);
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
    let phone: Phone= new Phone(0,'',0);
    phone.stateEnum= State.Added;
    this.addressModel.phones.push(phone);
    this.detector.detectChanges();
  }

  addAddress()
  {
    this.addressAdded.emit(true)
  }

  changeState()
  {
    if(this.addressModel.stateEnum==State.Added)
    {
      return;
    }
    else
    {
      this.addressModel.stateEnum= State.Modified;
    }
  }
  
}
