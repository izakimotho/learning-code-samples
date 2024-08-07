import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users$ = new BehaviorSubject<User[]>([]);

  //Endpoint  Backend
  private backendURL: string = "http://localhost:9001/api/v1/users";


  constructor(private httpClient: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.httpClient.get<User[]>(`${this.backendURL}`).subscribe(users => {
      this.users$.next(users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.backendURL}`, user).pipe(
      tap(savedUser => {
        const currentUsers = this.users$.value;
        const updatedUsers = [...currentUsers, savedUser];
        this.users$.next(updatedUsers);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.backendURL}/${id}`).pipe(
      tap(() => {
        // Eliminar el usuario de la lista actual de usuarios
        this.loadUsers();
      })
    );
  }

}
