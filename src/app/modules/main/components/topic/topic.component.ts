import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/crud.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  addToRelatedTopic: boolean = false;
  mainForm: FormGroup;
  paramToSearch: any;
  paramsToTableData: any;
  relatedTopics: any;
  relatedTopicsFiltered: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  title: string;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /*update start*/
    this.route.params.subscribe(params => {      
      if(params.id) {
        this.paramToSearch = params.id;
        this.submitToCreate = false;
        this.submitToUpdate = true;
        this.title = "Change Topic Data";
        this.submitButton = "Update";

        this.crud.read({
          route: 'topics/'+this.paramToSearch.replace(':', '')
        }).then(res => {
          let obj = res;

          this.mainForm.get('name').setValue(obj['name']);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "New Topic";
        this.submitButton = "Create";
      }
    })
    /*update end*/

    /**
     * Select options start
     */
    this.crud.read({
      route: 'topics',
      order: ['__key', 'desc']
    })
    .then(res => {
      this.relatedTopics = res;
      this.relatedTopicsFiltered = res;
    })
    /**
     * Select options end
     */

    this.mainForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'related_topics': new FormArray([]),
      'related_topics_name': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Topics List",
        delete: "__key",
        search: true
      },
      list: {
        route: "topics",
        show: ['name'],
        header: ['Topic'],
        order: ['id', 'desc'],
        edit: {route: '/main/topic/', param: '__key'},
        source: true
      },
      actionToolbar: {
        language: 'en-us'
      }
    };
  }

  /**
   * Shit over formArray start
   */
  onAddRelatedTopic = () => {
    let backgroundColor;
    this.relatedTopicsFiltered = [];

    //define differente background for listing itens on array
    if((this.mainForm.get('related_topics').value.length % 2 == 0)) {
      backgroundColor = '#cfd8dc';
    } else {
      backgroundColor = '#fff';
    }
    
    //object to array
    let control = new FormGroup({      
      'related_topics_name': new FormControl(this.mainForm.get('related_topics_name').value),
      '_backgroundColor': new FormControl(backgroundColor)
    });

    //creating array with object
    (<FormArray>this.mainForm.get('related_topics')).push(control);

    //removing item from autocomplete select while it is part of array created
    if(this.mainForm.get('related_topics').value.length > 0) {
      for(let lim = this.relatedTopics.length, i = 0; i < lim; i++) {
        if(this.relatedTopics[i].name != this.mainForm.get('related_topics_name').value) {
          this.relatedTopicsFiltered.push(this.relatedTopics[i]);
        }
      }
    }

    //cleaning form to array
    this.mainForm.get('related_topics_name').setValue(null);
    
    //removing add item to array button
    this.addToRelatedTopic = false;
  }

  onFilterDescription(event) {
    this.addToRelatedTopic = false;

    let query = event.target.value;
    
    if(event != null) {
      this.relatedTopicsFiltered = [];
      for(let lim = this.relatedTopics['length'], i = 0; i < lim; i++) {
        this.relatedTopics[i]
        if(this.relatedTopics[i].related_topics_name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          this.relatedTopicsFiltered.push({
            description: this.relatedTopics[i].related_topics_name,
            value: this.relatedTopics[i].value
          })
        }
      }
    } else {
      this.relatedTopicsFiltered = this.relatedTopics;
    }

    return this.relatedTopicsFiltered;
  }

  onRemoveRelatedTopic = (index) => {
    const control = <FormArray>this.mainForm.controls['related_topics'];
    
    //putting it back to autocomplete select over relatedTopicsFiltered
    this.relatedTopicsFiltered.push({
      name: control.value[0].related_topics_name
    });

    //TO-DO sort relatedTopicsFiltered
    

    //removing from form array
    control.removeAt(index);    

    //reorganizing list of arrays over form array
    for(let lim = this.mainForm.get('related_topics').value.length, i =0; i < lim; i++) {
      if((i % 2 == 0)) {
        control.controls[i].patchValue({_backgroundColor: '#cfd8dc'})
      } else {
        control.controls[i].patchValue({_backgroundColor: '#fff'})
      }
    }
  }
  /**
   * Shit over formArray end
   */

  onSubmit = () => {
    if(this.submitToUpdate) {
      let object = this.mainForm.value;
      
      let params = {
        route: 'topics',
        objectToUpdate: object,
        paramToUpdate: this.paramToSearch.replace(':', '')
      };
  
      this.crud.update(params)
      .then(res => {
        this.mdsnackbar.open(res['message'], '', {
          duration: 2000
        })
      }, rej => {
        this.mdsnackbar.open(rej['message'], '', {
          duration: 3000
        })
      })
  
      this.router.navigate(['/main/topic']);
    } else {
      let object = this.mainForm.value;

      let params = {
        route: 'topics',
        object: object
      };

      this.crud.create(params)
      .then(res => {
        this.mdsnackbar.open(res['message'], '', {
          duration: 2000
        })
      }, rej => {
        this.mdsnackbar.open(rej['message'], '', {
          duration: 3000
        })
      })
    }

    this.mainForm.reset();

    this.makeList();
  }

  toggleAddToRelatedTopic = (event) => {
    if(event.target.value != "") {
      this.addToRelatedTopic = true;
    } else {
      this.addToRelatedTopic = false;
    }
  }
}
