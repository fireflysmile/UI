import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportFilesComponent } from './export-files.component';
import { SelectModule } from '../select/select.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExportFilesComponent],
  exports: [ExportFilesComponent],
  imports: [
    CommonModule,
    SelectModule,
    FormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExportFilesModule { }
