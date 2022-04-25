import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  open(){
   let Q=  document.getElementById('question')

      Q.classList.toggle('show')
    
  }
  open1(){
    let Q=  document.getElementById('side')
 
       Q.classList.toggle('show')
     
   }

}
