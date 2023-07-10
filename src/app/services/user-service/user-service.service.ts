import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.users);

  addUser(user: any) {
    this.users.push(user);
    this.usersSubject.next([...this.users]);
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }
}
