import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alerts/alert.service';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
 
  public usersData$!: Observable<User[]>;

  public alertServiceObs$!: Observable<Alert>;
 
  constructor(private readonly userService: UserService, public readonly alertService: AlertService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     
    this.usersData$ = this.userService.getUsers(); 
    this.alertServiceObs$ = this.alertService.initObsAlert();
  }

  deleteUser(id: number = 0) { 
    if (confirm("Do you want to delete user ?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          console.log("User deleted  => " + JSON.stringify(response));
          this.alertService.success("User deleted  => " + JSON.stringify(response));
        },
        error: (error) => {
          console.error(" Error => " + error);
          this.alertService.error(" Error => " + error);
        }
      });
    }
  }
}
