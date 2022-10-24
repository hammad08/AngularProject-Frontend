import { Address } from "./address";
import { BaseClass } from "./BaseClass";
import { Phone } from "./phone";

export class Customer extends BaseClass{
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    addresses: Address[];
    constructor(customerId: number,firstName:string,lastName:string,email:string,confirmEmail:string)
    {
        super()
        this.customerId=customerId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.confirmEmail=confirmEmail;
        this.addresses = [
            new Address(0,'','','','','','',0,[new Phone(0,'',0)])
        ];
    }
}