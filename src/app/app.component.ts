import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user1Activated = false;
  user2Activated = false;

  constructor(private usersService: UsersService){}

  ngOnInit(){
    //listening to the userActivate subject from the service which will get the data
    //This creates cross component communication
    // Used in place of an event emitter
    this.usersService.userActivated.subscribe(
      (id: number) => {
        if(id === 1){
          this.user1Activated = true;
        } else if (id === 2){
          this.user2Activated = true;
        }
      }
    );
  }
}
