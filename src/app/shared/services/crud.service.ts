import { Injectable } from '@angular/core';

import { fbDatabase } from './../../../environments/firebase-database-config';

@Injectable()
export class CrudService {
  error: any;
  
  constructor() { }

  create = (params) => new Promise((resolve, reject) => {
    if(!params.route) {
      return this.error = {
        code: "c-01",
        description: "Reference to firebase required"
      }
    }

    if(!params.object) {
      return this.error = {
        code: "c-02",
        description: "Object to push required"
      }
    }

    let ref = fbDatabase.ref(params.route).push(params.object);

    ref
    .catch(error => {
    })
    .then((res) => {
      resolve({
        cod: "ra-03",
        message: "Cadastro feito com sucesso"
      });
    })
  });

  read = (params) => new Promise((resolve, reject) => {
    let key, obj, ref, res, objFiltered;
    
    if(params) {
      if(!params.route) {
        return this.error = {
          code: "r-01",
          description: "Reference to firebase required"
        }
      } 

      if(params.order) {
        if(params.equalTo) {
          ref = fbDatabase.ref(params.route).orderByChild(params.order[0]).equalTo(params.equalTo);
        }else {
          ref = fbDatabase.ref(params.route).orderByChild(params.order[0]);
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
    }
    
    ref
    .once('value')
    .then(snap => {
      if(snap.val() != null) {
        res = snap.val();
        key = Object.keys(res);
        obj = Object.keys(res).map(k => res[k]); //Tranformando objetos em arrays
        let noObject = false;

        for(let i=0; i<Object.keys(res).length; i++){
          if(typeof(obj[i]) == "object") {
            obj[i].__key = key[i];
          } else {
            noObject = true;
          }
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
            let temp = {}; 
            let limitStart; 
            let limitEnd = (params.limit * params.page);

            if(params.page > 1) { 
              limitStart = ((params.limit * params.page) - params.limit + 1);
            } else {
              limitStart = ((params.limit * params.page) - params.limit);
            }

            console.log(obj[i])
            if(i >= limitStart && i <= limitEnd) {
              objFiltered.push(obj[i]); 
            }
          }
          
          obj = objFiltered;
          console.log(obj)
        }
        
        obj.total = snap.numChildren();

        if(noObject) {
          resolve(res);
        } else {
          resolve(obj);
        }
      } else {
        resolve({
          cod: "ra-03",
          message: "Nenhum cadastro"//É preciso declarar ao menos um child"
        });
      }
    })
  })

  update = (params) => new Promise((resolve, reject) => {
    if(!params.route) {
      reject({
        cod: "u-01",
        message: "Informar erro u-01 ao administrador"
      });
    }

    if(!params.idToUpdate) {
      reject({
        cod: "u-02",
        message: "Informar erro u-02 ao administrador"
      });
    }

    if(!params.object) {
      reject({
        code: "error-c-01",
        description: "Object to push required"
      })
    }

    let ref = fbDatabase.ref(params.route+"/"+params.idToUpdate);
    ref.update(params.obj)
    .catch(rej => {
      reject({
        cod: "error-u-01",
        message: rej
      })
    })
    .then(res => {
      resolve({
        cod: "u-03",
        message: "Atualização feita com sucesso"
      });
    })
  })

  delete = () => {

  }
}
