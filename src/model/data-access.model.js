import {join, dirname} from 'path'
import {LowSync, JSONFileSync} from 'lowdb'
import {fileURLToPath} from 'url'

import axios from  'axios'

export default class DataAccessModel {

  static loadTable() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, `../../data/${this.tableName}/data.json`)

    const adapter = new JSONFileSync(file)
    const dbTable = new LowSync(adapter)

    dbTable.read()

    return dbTable
  }

  static async list() {
    let list = []
    const params = new URLSearchParams({ "table": this.tableName})
    await axios
      .get('http://localhost:3001/list', { params })
      .then(res => {
        res.data.forEach((register) => {
          list.push(new this(register))
        })
      })
      .catch(error => {
        console.error(error);
      });

    return list
  }

  static async find(id) {
    let register
    const params = new URLSearchParams({ "table": this.tableName, "id": id })
    await axios
      .get('http://localhost:3001/find', { params })
      .then(res => {
        register = new this(res.data) 
      })
      .catch(error => {
        console.error(error);
      });

    return register
  }

  static async findByField(field, value) {
    let register
    const params = new URLSearchParams({ "table": this.tableName, "field": field, "value": value})
    await axios
      .get('http://localhost:3001/findByField', { params })
      .then(res => {
        register = new this(res.data) 
      })
      .catch(error => {
        console.error(error);
      });

    return register
  }

  static async delete(id) {
    const params = new URLSearchParams({ "table": this.tableName, "id": id })
    await axios
      .delete('http://localhost:3001/delete', { params })
      .then(res => {
        res.data
      })
      .catch(error => {
        console.error(error);
      });
  }

  static async create(params) {
    // validando campos
    let paramsToCreate = {}
    this.fields.forEach((field) => {
      if (params[field] !== null && params[field] !== undefined) {
        paramsToCreate[field] = params[field]
      }
    })

    //construido payload
    const payload = JSON.stringify({ 
      "table": this.tableName,
      "params": paramsToCreate 
    })

    let register
    const res = await axios.post('http://localhost:3001/create', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      register = new this(res.data) 
    })
    .catch(error => {
      console.error(error)
    })

    console.log(register)
    return register
  }

  static async update(id, params) {
    // validando campos
    let paramsToUpdate = {}
    this.fields.forEach((field) => {
      if (params[field] !== null && params[field] !== undefined) {
        paramsToUpdate[field] = params[field]
      }
    })

    //construido payload
    const payload = JSON.stringify({ 
      "table": this.tableName,
      "id": id,
      "params": paramsToUpdate 
    })

    let register
    const res = await axios.put('http://localhost:3001/update', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      register = new this(res.data) 
    })
    .catch(error => {
      console.error(error)
    })

    return register
  }
}