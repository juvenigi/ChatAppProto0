import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectionTestComponent} from "./components/connection-test/connection-test.component";

const routes: Routes = [
  {path: "**", component: ConnectionTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
