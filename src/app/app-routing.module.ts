import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';
//import { DataDictionaryComponent } from './data-dictionary/data-dictionary.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { StarComponent } from './star/star.component';


const routes: Routes = [
  {path : '', component : DataDictionaryComponent},
  // {path : 'star', component : StarComponent},
  {
    path: 'dataDictionary',
    loadChildren: () =>
      import(`src/app/data-dictionary/data-dictionary.module`).then((m) => m.DataDictionaryModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
