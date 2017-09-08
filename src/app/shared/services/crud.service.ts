import { Injectable } from '@angular/core';

import { fbDatabase } from './../../../environments/firebase-database-config';

@Injectable()
export class CrudService {
  error: any;
  
  constructor() { }

  create = () => {

  }

  read = (params) => new Promise((resolve, reject) => {
    let key, obj, ref, res, objFiltered;

    if(!params.route) {
      return this.error = {
        code: "r-01",
        description: "Reference to firebase required"
      }
    } 

    if(params.order) {
      if(params.equalTo) {
        ref = fbDatabase.ref(params.route).orderByChild(params.order).equalTo(params.equalTo);
      }else {
        ref = fbDatabase.ref(params.route).orderByChild(params.order);
      }
    }else {
      if(params.equalTo) {
        resolve({
          code: "r-02",
          message: "For EqualTo you need to set orderByChild (order)"
        })        
      }
      ref = fbDatabase.ref(params.route);
    }
    ref
    .once('value')
    .then(snap => {
      if(snap.val() != null) {
        res = snap.val();
        key = Object.keys(res);
        obj = Object.keys(res).map(k => res[k]); //Tranformando objetos em arrays
        
        for(let i=0; i<Object.keys(res).length; i++){
          obj[i].__key = key[i];
        }
        
        if(params.show) {
          for(let i= 0; i < obj.length; i++) {
            let temp = {};

            for(let j = 0; j < params.show.length; j++) {
              temp[params.show[j]] = obj[i][params.show[j]];
            }

            objFiltered.push(temp);
          }
          
          obj = objFiltered;       
        } 
        
        if(!params.page) {
          params.page = 1; 
        }

        if(params.limit) {
          let objFiltered = [];
          for(let i= 0; i < obj.length; i++) {
            let temp = {}, limitStart = ((params.limit * params.page) - params.limit + 1), limitEnd = (params.limit * params.page);

            if(i >= limitStart && i <= limitEnd) {
              objFiltered.push(obj[i]); 
            }
          }
          
          obj = objFiltered;
        }

        obj.total = snap.numChildren();

        resolve(obj);
      } else {
        resolve({
          cod: "ra-03",
          message: "Nenhum cadastro"//É preciso declarar ao menos um child"
        });
      }
    })
  })

  update = () => {

  }

  delete = () => {

  }
}
