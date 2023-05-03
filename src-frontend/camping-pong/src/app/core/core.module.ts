import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    StarRatingModule
  ],
  exports: [
    MaterialModule,
    StarRatingModule
    
  ]
})
export class CoreModule { }
