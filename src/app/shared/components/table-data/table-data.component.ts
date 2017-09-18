import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'bonamondo-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() params;

  arrayHeader: any = []; 
  arrayNoFilter: any = [];
  arraySource: any = [];
  arraySourceFinal: any = [];
  arraySourceSearch: any = [];
  backgroundColor: string;
  backgroundColorIndex: number;
  checkAllController: boolean = false;
  checkAllItens: boolean = false;
  checkedItem: boolean = false;
  color: string;
  colorByData: any;
  colorIndex: number;
  editRoute: string;
  errors: any = [];
  isLoadingList: boolean = true;
  isMobile: boolean;
  listController: FormGroup;
  listForm: FormGroup;
  msg: string;
  pageCurrent: number;
  pageTotal: number;
  placeholderToRowsPerPage: string;
  placeholderToPage: string;
  placeholderToSearch: string;
  searchForm: FormGroup;
  searchInput: boolean = false;
  searchString: any;
  searchValue: any = [];
  
  constructor(
    private crud: CrudService,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      'search': new FormControl(null),
      'searchSelect': new FormControl(null)
    })

    this.listController = new FormGroup({
      'row': new FormControl(null)
    })

    this.listForm = new FormGroup({
      'deleteField': new FormControl(null)
    })
  }

  ngOnChanges() {
    /**
     * Parameters validation: start
     */
    if(this.params.list) {
      if(!this.params.list.route) {
        this.errors.push({
          cod: "td-01",
          message: "É preciso definir a rota de busca no banco. (params.list.route: any - ex.:['route'])"
        });
      }

      if(!this.params.list.limit) {
        this.params.list.limit = 5;
      }

      if(!this.params.list.order) {
        this.params.list.order = "";
      }

      if(this.params.list.header) {
        this.arrayHeader = this.params.list.header;
      } else {
        this.errors.push({
          cod: "td-02",
          message: "É preciso definir o cabeçalho dos campos que serão mostrados na lista. (params.list.header: any - ex.:['Nome', 'CPF'])"
        });
      }

      if(!this.params.list.show) {
        if(!this.params.list.hide) {
          this.errors.push({
            cod: "td-03",
            message: "É preciso definir que campos do banco serão mostrados (show) OU (exclusivo) não mostrados (hide). (params.list.show: any - ex.:['name', 'cpf_number'] XOR params.list.hide: any - ex.:['name', 'cpf_number'])"
          });
        }
      }

      if(this.params.list.show) {
        if(this.params.list.hide) {
          this.errors.push({
            cod: "td-04",
            message: "Se definir parâmetro show, não pode definir parâmetro hide."
          });
        }
      }
    } else {
      setTimeout(() => {
        if(this.params.list == undefined) {
          this.errors.push({
            cod: "td-05",
            message: "É preciso definir list e seus parâmetros."
          });
        }
      }, 20000)
    }
    
    if(this.params.actionToolbar) {
      this.pageTotal = this.arrayNoFilter.length;
      
      if(!this.params.actionToolbar.selectedPageValue) {
        this.params.actionToolbar.selectedPageValue = 1;
      }

      if(!this.params.actionToolbar.selectedRowValue) {
        this.params.actionToolbar.selectedRowValue = 1;
      }

      if(!this.params.actionToolbar.rows) {
        this.params.actionToolbar.rows = [1, 5, 10, 15, 20];
      }

      if(!this.params.actionToolbar.page) {
        this.params.actionToolbar.page = 1;
      }

      if(!this.params.actionToolbar.language) {
        this.params.actionToolbar.language = "en";
      }
      
      if(this.params.actionToolbar.language == 'pt-BR') {
        this.placeholderToRowsPerPage = "Linhas por página";
        this.placeholderToPage = "de";
        this.placeholderToSearch = "Campo para pesquisar";
      } else {
        this.placeholderToRowsPerPage = "Rows per page";
        this.placeholderToPage = "of";
        this.placeholderToSearch = "Field to search";  
      }
    } 
    
    /**
     * Parameters validation: end
     */
    
    if(this.params.actionToolbar) {
      this.pageCurrent = this.params.actionToolbar.page;
    } 

    this.readData();
  }

  ngOnInit() { 
    if (screen.width < 1024 || screen.height < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  /**
   * Toolbar area
   */
  search = () => {
    this.searchValue = [];
    
    this.clearSearch();

    this.searchString = setTimeout(() => {
      let checkLoop = -1;
      let count;
      let data = this.arraySourceFinal;
      let dataAny;
      let dataString;
      let temp = [];
      let test;

      if(this.searchForm.get('search').value) {
        if(this.searchForm.get('searchSelect').value) {
          this.searchValue.push({
            where: this.searchForm.get('searchSelect').value,
            value: this.searchForm.get('search').value
          })
        } else {
          for(let lim = this.params.list.show.length, i = 0; i < lim; i++) {
            this.searchValue.push({
              where: this.params.list.show[i],
              value: this.searchForm.get('search').value
            })
          }
        }
      } else {
        this.searchValue = [];
      }

      this.readData();
    }, 500)
  }

  clearSearch = () => {
    clearTimeout(this.searchString);
  }

  searchInputToggle = () => {
    this.searchInput = !this.searchInput;
    this.searchForm.reset();

    if(!this.searchInput) {
      this.search();
    }
  }  
  //Over delete
  checkAllToggle = (event) => {
    this.checkAllController = event.checked;

    if(event.checked) {
      this.listForm.get('deleteField').setValue(true);
      
      for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
        this.arraySource[i]._checked = true;
      }

      this.checkedItem = true;
    } else {
      this.listForm.get('deleteField').setValue(false);

      for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
        this.arraySource[i]._checked = false;
      }

      this.checkedItem = false;
    }
  }

  checkItem = (index, e) => {
    let count = 0;

    if(e.checked)
      this.checkedItem = true;

    this.arraySource[index]._checked = e.checked; 

    this.checkAllController = true;
    
    for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
      if(this.arraySource[i]._checked){
        count ++;
      }
    }

    if(count == this.arraySource.length) {
      this.checkAllController = true;
    } else {
      this.checkAllController = false;
    }

    if(count < 1) {
      this.checkedItem = false;
    } else {
      this.checkedItem = true;
    }
  }

  delete = (fieldToUseInDelete) => {
    let itensToDeleteIds = [];

    for(let lim = this.arraySource.length, i = 0; i < lim; i++) {
      if(this.arraySource[i]._checked){
        itensToDeleteIds.push(this.arraySource[i][fieldToUseInDelete]);
      }
    }
  }
  
  /**
   * List area
   */
  filterArrayKey = (data) => {
    if(data['obj']) {
      data = data['obj'];
    }
    //Everything from array, ignoring property show from list object
    let noFilter = data.map((data) => {
      let backgroundColor;
      let color;
      let field;
      let fieldValue;
      let temp = [];
      
      for(let lim = Object.keys(data).length, i = 0; i < lim; i++) {
        field = Object.keys(data)[i];
        
        if(this.params.list.colorByData) {
          for(let lim = this.params.list.colorByData.length, j =0; j < lim; j++) {          
            if(field == this.params.list.colorByData[j]['field']) {
              fieldValue = Object.keys(data)[i];
              backgroundColor = this.params.list.colorByData[j]['backgroundColor'];
              color = this.params.list.colorByData[j]['color'];
              
              if(this.params.list.colorByData[j]['fieldValue'] == data[fieldValue]) {
                temp.push(data['backgroundColor'] = backgroundColor);
                temp.push(data['color'] = color);
              } else {
                temp.push(data['backgroundColor'] = "#fff");
                temp.push(data['color'] = "#000");
              }
            }
          }
        }
        temp.push(data[field]);
      }
      
      return temp;
    })

    //Filtered by property show in list object
    let filter = data.map((data) => {
      let backgroundColor;
      let color;
      let field;
      let fieldValue;
      let temp = [];
      
      for(let lim = this.params.list.show.length, i = 0; i < lim; i++){
        temp.push(data[this.params.list.show[i]]);
      }

      return temp;
    })
    
    this.backgroundColorIndex = (filter.length);
    this.colorIndex = (filter.length - 1);
    this.arrayNoFilter = noFilter;
    this.arraySourceFinal = filter; 
    this.arraySourceSearch = filter;
  }

  onClickEdit = (route, param) => {
    let finalRoute = [route+":"+param];
    
    this.router.navigate(finalRoute);
  }

  onClickOrder = (index) => {
    let sort;

    this.params.list.order[1] ==='asc' ?  sort = "desc" : sort = "asc";
    this.params.list.order = [];

    this.params.list.order.push(this.params.list.show[index], sort);

    this.readData();
  }
  /**
   * Action area
   */
  onChangeLimit = (event) => {
    this.params.list.limit = event.value;

    this.readData();
  }

  onClickPage = (operation) => {
    if(operation == 'add') {
      this.pageCurrent += 1;
    }

    if(operation == 'subtract') {
      this.pageCurrent -= 1;
    }
    
    this.readData();
  }  

  readData = () => {
    let readParams = {
      route: this.params.list.route,
      limit: this.params.list.limit,
      order: this.params.list.order,
      page: this.pageCurrent,
      search: this.searchValue
    }

    this.isLoadingList = true;

    this.crud.read(readParams)
    .then(res => {
      this.isLoadingList = false;
      
      if(res['obj']) {
        this.arraySource = res['obj']; 
      } else {
        this.arraySource = res;
      }
      
      this.filterArrayKey(this.arraySource);

      this.pageTotal = Math.ceil(this.arraySource.total/this.params.list.limit);
      
      if(this.arraySource.length < 1) {
        this.msg = "Nada na lista";
      }
    })
  }
}
