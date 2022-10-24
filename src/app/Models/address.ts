import { BaseClass } from "./BaseClass";
import { Phone  } from "./phone";

export class Address extends BaseClass{
    addressId: number;
    addressType: string;
    street1: string;
    street2:string;
    city:string;
    state:string;
    zipcode:string;
    customerId:number;
    phones: Phone[];
    
    constructor(addressId:number,addressType:string,street1: string,street2:string,city:string,state: string,zipcode: string, customerId: number, phoneList: Phone[])
    {
        super();
        this.addressId=addressId;
        this.addressType=addressType;
        this.street1=street1;
        this.street2=street2;
        this.city=city;
        this.state=state;
        this.zipcode=zipcode;
        this.phones = phoneList;
        this.customerId= customerId;
    }
}
