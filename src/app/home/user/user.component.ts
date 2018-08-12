import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Users[];

  constructor(private userService: UserService) {
    this.userService.getAccessToken().subscribe(data => {
      this.getUsers(data.access_token)
    });
  }

  ngOnInit() {

  }

  getUsers(accessToken: string) {
    this.userService.getUsers(accessToken)
        .subscribe(users => {
          this.users = users;
          console.log(users);
        });
  }

}
