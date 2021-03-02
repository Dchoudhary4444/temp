import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDictionaryRoutingModule } from './data-dictionary-routing.module';
import { SearchComponent } from './search/search.component';
import { DataDictionaryComponent } from './data-dictionary.component';
import { SortPipe } from './util/sort.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AddRowComponent } from './add-row/add-row.component';
@NgModule({
  declarations: [
    SearchComponent,
    DataDictionaryComponent,
    SortPipe,
    DataGridComponent,
    AddRowComponent,
  ],
  imports: [
    CommonModule,
    DataDictionaryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DataDictionaryModule { }
