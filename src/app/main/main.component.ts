import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

declare const jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    jQuery(document).ready(() => {
      jQuery(window).resize();
    });
  }
}
