import { NgModule } from '@angular/core';
import { ImgSrcPipe } from './img-src';
import { BgImgPipe } from './bg-img.pipe';
import { ShowFromToPipe } from './show-from-to.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ColorPipe } from './color.pipe';
import { AvatarPipe } from './avatar.pipe';
import { TruncatePipe } from './truncate.pipe';
import { EnvPipe } from './env.pipe';
import { FileIconPipe } from './file-icon.pipe';


@NgModule({
  declarations: [
    ColorPipe,
    ImgSrcPipe,
    BgImgPipe,
    ShowFromToPipe,
    AvatarPipe,
    TruncatePipe,
    EnvPipe,
    FileIconPipe,
  ],
  imports: [],
  exports: [
    ImgSrcPipe,
    BgImgPipe,
    ShowFromToPipe,
    ColorPipe,
    AvatarPipe,
    TruncatePipe,
    EnvPipe,
    FileIconPipe,
  ],
  providers: [
    CurrencyPipe,
    ColorPipe,
    DatePipe
  ]
})
export class PipesModule { }
