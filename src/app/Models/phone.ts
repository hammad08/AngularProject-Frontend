import { BaseClass } from "./BaseClass";

export class Phone extends BaseClass{
    phoneId: number;
    phoneNumber: string;
    addressId: number;
    constructor(phoneId:number,phoneNumber:string,addressId: number)
    {
        super();
        this.phoneId=phoneId;
        this.phoneNumber=phoneNumber;
        this.addressId=addressId;
    }
}
