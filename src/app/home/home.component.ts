﻿import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    
    constructor(    private route: ActivatedRoute,
        private router: Router,){

    }
    ngOnInit(): void {
       
    }
}