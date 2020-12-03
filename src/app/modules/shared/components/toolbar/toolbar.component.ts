import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  appName = 'ngBlog';
  opened: boolean;

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut(){
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
