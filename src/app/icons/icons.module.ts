import { NgModule } from '@angular/core';

import {FeatherModule} from 'angular-feather';
import {Copy, ExternalLink} from 'angular-feather/icons';

const icons = {
  Copy,
  ExternalLink,
}

@NgModule({
  imports: [
    FeatherModule.pick(icons),
  ],
  exports: [
    FeatherModule,
  ]

})
export class IconsModule { }
