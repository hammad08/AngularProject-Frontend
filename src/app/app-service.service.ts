import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Customer } from './Models/customer';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private apiUrl = "https://localhost:44393/api";

  constructor(private httpClient: HttpClient) { }

  getCustomer(fName: string, lName: string): Observable<Customer> {
    let customer = this.httpClient.get<Customer>(this.apiUrl + '/customers/byFullName/' + fName + '/' + lName);
    console.log(customer);
    return customer;
  }

  saveCustomer(customer: Customer): Observable<Customer>{
    let cust= this.httpClient.post<Customer>(this.apiUrl + '/customers/', customer);
    console.log(cust);
    return cust;
  }

  deleteCustomer(customer: Customer)
  {
    return this.httpClient.delete<Customer>(this.apiUrl + '/customers/'+customer.customerId).subscribe((res) => {
    },(err:HttpErrorResponse)=>{console.error(err.message);});
  }

  

  addCustomer(customer: Customer)
  {
    return this.httpClient.post<Customer>(this.apiUrl + '/customers', customer).subscribe((res) => {
    },(err:HttpErrorResponse)=>{console.error(err.message);});
  }


}
