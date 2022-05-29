import { join, dirname } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import { fileURLToPath } from 'url'


export class ModelBase {
    // isolar

    static loadTable() {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const file = join(__dirname, `../data/${this.tableName}/data.json`)
  
      const adapter = new JSONFileSync(file)
      const dbTable = new LowSync(adapter)
   
      dbTable.read()
  
      return dbTable
    }

    // tentar retornar uma instancia
    static list() {
      return this.loadTable().data
    }
  
    // tentar retornar uma instancia
    static find(id) {
      const registers = this.loadTable().data
      return registers.find(element => element.id === id)
    }
  
    // tentar retornar uma instancia
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

      this.fields.forEach((field) => {
        if (params[field] !== null) { 
          values[field] = params[field]
        } else {
          values[field] = null
        }
      })

      table.data.push(values)
      table.write()
    }

    static delete(id) {
      const table = this.loadTable()
      const index = table.data.findIndex(element => element.id === id)
      
      if (index != -1) {
        table.data.splice(index, 1)
        table.write()
      }
    }
  
    // tentar retornar uma instancia e mudar para meotodo de instancia
    static update(id, params) {
      const table = this.loadTable()
      const index = table.data.findIndex(element => element.id === id)

      if (index == -1) return

      Object.keys(params).forEach((field) => {
        if (this.fields.includes(field)) { 
          table.data[index][field] = params[field]
        }
      })

      table.write()
    }
}