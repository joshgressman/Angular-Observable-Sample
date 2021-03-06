import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //Strore properties of the subscription
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
      const myNumbers = Observable.interval(1000)
      //map() a new observable into any form of data you want
      .map(
        (data: number) => {
          return data * 2;
        }
      );
    // sets the interval of the Observable
    // The observable is now set up and you can subscribe to it

       this.numbersObsSubscription = myNumbers.subscribe(
       (number: number) => {
         console.log(number);
     }
    //   The number will = the interval amount incremented every second
    //   the subscribe is listening to changes from the Onservable
    //   Hence Observing changes
    );

    //OBSERVABLE FROM SCRATCH
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() =>{
       observer.next('first package');
      }, 2000);
      setTimeout(() =>{
       observer.next('second package');
     }, 4000);
     setTimeout(() =>{
      // observer.error("this does not work");
      observer.complete();
    }, 5000);
    });
    //assigns the subscription to a property to destroy / stop in the ngOnDestroy
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => {console.log(data);},
      (error: string) => {console.log(error);},
      () => {console.log('Completed');}
    );
  }

  //will end the subscription when the component is destroyed / new one loaded
  ngOnDestroy(){
   this.numbersObsSubscription.unsubscribe();
   this.customObsSubscription.unsubscribe();
  }

}
