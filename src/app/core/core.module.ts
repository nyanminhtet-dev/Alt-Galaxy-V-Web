import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavigationComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule | null) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import CoreModule only in AppModule.');
    }
  }
}
