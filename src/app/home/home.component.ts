import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_EP } from '../auth/auth.guard';
import { TKN } from '../auth/user';
import { HttpService } from '../common/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authService: HttpService<any>;
  constructor(private http: HttpClient, private router: Router) { 
    this.authService = new HttpService(http, AUTH_EP);
  }

  ngOnInit(): void {
  }

  logout() {
    console.log('logout');
    localStorage.removeItem(TKN);
    this.authService.delete('ses').subscribe(
        () => {
            console.log('logout done');
            this.router.navigate(['/auth']);
        }
    );
}
}
