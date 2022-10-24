import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef, ChangeDetectionStrategy, Input,Output,EventEmitter } from '@angular/core';
import { Address } from 'src/app/Models/address';
import { Customer } from 'src/app/Models/customer';
import { AppServiceService } from '../app-service.service'
import { State } from '../Models/BaseClass';
import { Phone } from '../Models/phone';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  private detector: ChangeDetectorRef;
  public confirmEmail: string='';

  customerModel = new Customer(0,"","","","");
  AppService: AppServiceService;

  constructor(AppService: AppServiceService,detector: ChangeDetectorRef)
  {
    this.AppService = AppService;
    this.detector=detector;
  }
  ngOnInit(): void {
    //this.getCustomerFromSearch();
  }

  getCustomerFromSearch() {
    this.AppService.getCustomer(this.customerModel.firstName, this.customerModel.lastName).subscribe(
      (data: Customer) =>{
        this.customerModel = {...data};
        this.customerModel.confirmEmail=data.email;
        this.detector.detectChanges();
        console.log(this.customerModel);
      }, (error: HttpErrorResponse) =>{
        console.log(error);
      }
    )
    console.log(this.customerModel);
  }

  deleteAddress(address: Address){
    this.detector.detectChanges();
    // this.customerModel.addresses=this.customerModel.addresses.filter(a => a !== address);
  }

  remainingAddresses(): Address[]{
    return this.customerModel.addresses.filter(a => a.stateEnum !== State.Deleted);
    // return this.addressModel.phones.filter(a => a.stateEnum !== State.Deleted);

  }

  addAddress(status: boolean)
  {
    this.customerModel.addresses.push(new Address(0,'','','','','','',0,[
      new Phone(0,"",0)
    ])) 
  }

  saveCustomer(){
    this.AppService.saveCustomer(this.customerModel);
  }

  deleteCustomer(){
    this.customerModel.stateEnum= State.Deleted;
    this.AppService.deleteCustomer(this.customerModel)
  }

  changeState()
  {
    this.customerModel.stateEnum= State.Modified;
  }

  changeParentState(value: boolean)
  {
    this.customerModel.stateEnum= State.Modified;

  }
}
