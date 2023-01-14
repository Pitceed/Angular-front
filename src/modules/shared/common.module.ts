import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule as NgCommonModule} from "@angular/common";

@NgModule ({
  imports: [
    MatIconModule,
    NgCommonModule
  ],
  exports: [
    MatIconModule,
    NgCommonModule
  ]
})

export class CommonModule { }
