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

  static delete(id) {
    const table = this.loadTable()
    const index = table.data.findIndex(element => element.id == id)

    if (index == -1) return

    // deletando o registro do banco de dados
    table.data.splice(index, 1)
    table.write()
  }

  static create(params) {
    const table = this.loadTable()

    // setup new id
    const registersLength = table.data.length
    let id = 1
    if (registersLength > 0) {
      let lastElementid = table.data[registersLength - 1].id
      id = lastElementid + 1
    }

    let values = {
      "id": id
    }

    // constroi os parametros usando os campos do model e os parametros passados
    this.fields.forEach((field) => {
      if (params[field] !== null) {
        values[field] = params[field]
      } else {
        values[field] = null
      }
    })

    // salvando no banco de dados
    table.data.push(values)
    table.write()

    return this.find(id)
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