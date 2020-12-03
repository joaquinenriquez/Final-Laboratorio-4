import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-multi-select-con-buscador',
  templateUrl: './multi-select-con-buscador.component.html',
  styleUrls: ['./multi-select-con-buscador.component.scss']
})
export class MultiSelectConBuscadorComponent implements OnInit  {
  
  // Listado de elementos que recibimos por input
  @Input() items: string [];


  /** control for the selected bank for multi-selection */
  public selectControl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public controlFiltro: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public listaFiltrada: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  public seleccionarOpcion(itemsSeleccionados: string []) {
    itemsSeleccionados.forEach(unItem => {
      this.items.find(unItem => this.selectControl.setValue(unItem))
    })

    //this.selectControl.setValue
  }

  constructor() { }

  ngOnInit() {
    // set initial selection
    //this.selectControl.setValue([this.banks[10], this.banks[11], this.banks[12]]);

    // load the initial bank list
    this.listaFiltrada.next(this.items.slice());

    // listen for search field value changes
    this.controlFiltro.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  public cargarLista() {
    this.listaFiltrada.next(this.items.slice());
    this.setInitialValue();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.listaFiltrada
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  protected filterBanksMulti() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.controlFiltro.value;
    if (!search) {
      this.listaFiltrada.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.listaFiltrada.next(
      this.items.filter(item => item.toLowerCase().indexOf(search) > -1)
    );
  }

}








