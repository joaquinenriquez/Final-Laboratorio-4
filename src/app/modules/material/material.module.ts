import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatCardModule }  from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper'
import { MatTabsModule} from '@angular/material/tabs'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';


import {TableVirtualScrollModule} from 'ng-table-virtual-scroll';

// Componentes Personalizados
import { SelectAutocompleteModule } from 'select-autocomplete';



const modulosMaterial = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatListModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatStepperModule,
  MatTabsModule,
  MatSidenavModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  TableVirtualScrollModule,
  MatSortModule,
  ScrollingModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatTooltipModule,

  
  SelectAutocompleteModule
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modulosMaterial
  ],
  exports: [modulosMaterial],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }]
})
export class MaterialModule { }
