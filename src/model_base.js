import { join, dirname } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import { fileURLToPath } from 'url'


export class ModelBase {
    static loadTable() {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const file = join(__dirname, `../data/${this.tableName}/data.json`)
  
      const adapter = new JSONFileSync(file)
      const dbTable = new LowSync(adapter)
   
      dbTable.read()
  
      return dbTable
    }

    static list() {
      // gerando um array de objetos da instancia do model
      let list = []
      this.loadTable().data.forEach((register) => {
        list.push(new this(register))
      })

      return list
    }

    static find(id) {
      const registers = this.loadTable().data
      const register = registers.find(element => element.id === id)

      if (register === undefined) return

      return new this(register)
    }

    static findByField(field, value) {
      const registers = this.loadTable().data
      const register = registers.find(element => element[field] === value)
      if (register === undefined) return
      return new this(register)
    }

    static create(params) {
      const table = this.loadTable()

      // setup new id
      const registersLength = table.data.length
      let id = 1
      if(registersLength > 0) {
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

    static delete(id) {
      const table = this.loadTable()
      const index = table.data.findIndex(element => element.id === id)

      if (index == -1) return

      // deletando o registro do banco de dados
      table.data.splice(index, 1)
      table.write()
    }

    static update(id, params) {
      const table = this.loadTable()
      const index = table.data.findIndex(element => element.id === id)

      if (index === -1) return

      // atualizando os campos no banco usando os campos do model e os parametros passados
      this.fields.forEach((field) => {
        if (params[field] !== null) { 
          table.data[index][field] = params[field]
        } else {
          table.data[index][field] = null
        }
      })
      table.write()

      return this.find(id)
    }
}