import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AddAction } from './add.action';
import { DeleteAction } from './delete.action';
import { EditAction } from './edit.action';
import { FitColumnsAction } from './fit-columns.action';
import { RedoAction } from './redo.action';
import { ReloadAction } from './reload.action';
import { ResetColumnsAction } from './reset-columns.action';
import { UndoAction } from './undo.action';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  declarations: [
    AddAction,
    DeleteAction,
    EditAction,
    FitColumnsAction,
    RedoAction,
    ReloadAction,
    ResetColumnsAction,
    UndoAction
  ],
  exports: [
    AddAction,
    DeleteAction,
    EditAction,
    FitColumnsAction,
    RedoAction,
    ReloadAction,
    ResetColumnsAction,
    UndoAction
  ]
})
export class ActionsModule {}
