import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef, ChangeDetectionStrategy, Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { Address } from 'src/app/Models/address';
import { Customer } from 'src/app/Models/customer';
import { AddressComponent } from '../address/address.component';
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
    if(address.addressId==0)
    {
      let value= this.customerModel.addresses.indexOf(address);
      if(value> -1)
      {
        this.customerModel.addresses.splice(value,1);
      }
    }
    this.detector.detectChanges();
  }

  remainingAddresses(): Address[]{
    return this.customerModel.addresses.filter(a => a.stateEnum !== State.Deleted);
  }

  addAddress(status: boolean)
  { 
    let phone: Phone= new Phone(0,'',0);
    phone.stateEnum= State.Added;
    let address: Address=new Address(0,'','','','','','',0,[phone]);
    address.stateEnum= State.Added;
    this.customerModel.addresses.push(address);
    this.detector.detectChanges();
  }

  saveCustomer(){

    if(!this.validate(this.customerModel)){
      alert('Please provide complete details');
      return;
    }

    this.AppService.saveCustomer(this.customerModel).subscribe(
      (data: Customer) =>{
        this.customerModel = {...data};
        this.customerModel.confirmEmail=data.email;
        this.resetStates();
        alert("Data has been saved");
        this.detector.detectChanges();
        console.log(this.customerModel);
      }, (error: HttpErrorResponse) =>{
        console.log(error);
      }
    )
    this.AppService.saveCustomer(this.customerModel);
  }

  deleteCustomer(){
    this.customerModel.stateEnum= State.Deleted;
    if(this.customerModel.customerId==0)
    {
      alert("Error! Customer has not been created yet");
      return;
    }
    this.AppService.deleteCustomer(this.customerModel);
    alert("Customer is deleted");
    this.customerModel= new Customer(0,"","","","");
  }

  changeState()
  {
    this.customerModel.stateEnum= State.Modified;
  }

  resetStates()
  {
    this.customerModel.stateEnum=State.Unchanged;
    for(let add of this.customerModel.addresses){
      add.stateEnum= State.Unchanged;
      for(let ph  of add.phones)
        ph.stateEnum= State.Unchanged;
    }
  }

  validate(object: any) : boolean {
    for(let key in object){
      let property = object[key];
      if(typeof property === 'string'){
        if(property.length == 0){
          return false;
        }
      }
      else if(Array.isArray(property)){
        for(let element of property){
          return this.validate(element);
        }
      }
    }
    return true;
  }
  
//   validate(customer: Customer){
//     for(let address of customer.addresses)
//     {
//       if(address.addressType == '')
//       {
//         alert('invalid street1');
//         return;
//       }
//       if(address.street1 == '')
//       {
//         alert('invalid street1');
//         return;
//       }
//       if(address.zipcode == '')
//       {
//         alert('invalid street1');
//         return;
//       }
      
//     }
// }

}
