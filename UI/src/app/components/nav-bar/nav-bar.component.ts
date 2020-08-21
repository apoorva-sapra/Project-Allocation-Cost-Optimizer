import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isAuthenticated:boolean=false;
  constructor(private auth: AuthService,private router:Router) { }
 
  ngOnInit(): void {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(localStorage.token){
          this.isAuthenticated=true;
        }else{
          this.isAuthenticated=false;
        }
    }
  });
  }

  
  ngAfterViewInit(){}
  logout(){
    this.auth.logout();
  }

}
