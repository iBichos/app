import { join, dirname } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import { fileURLToPath } from 'url'

export class Customer {
  // private static methods

  static #loadTable() {
    // Loading customers "table"
    // Use JSON file for storage
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, '../../data/customers/data.json')

    const adapter = new JSONFileSync(file)
    const dbTable = new LowSync(adapter)
 
    // Read data from JSON file, this will set db.data content
    dbTable.read()

    return dbTable
  }

  static list() {
    return Customer.#loadTable().data.customers
  }

  static find(id) {
    const customers = Customer.#loadTable().data.customers
    return customers.find(element => element.id === id)
  }

  static create(username, email, password, cpf, phoneNumber, adress) {
    const table = Customer.#loadTable()

    // setup new id
    const customersLength = table.data.customers.length
    let id = 1
    if(customersLength > 0) {
      let lastElementid = table.data.customers[customersLength - 1].id
      id = lastElementid + 1
    }

    let values = {
      "id": id,
      "username": username,
      "email": email,
      "password": password,
      "cpf": cpf,
      "phoneNumber": phoneNumber,
      "adress": adress
    }

    table.data.customers.push(values)
    table.write()
  }

  static delete(id) {
    const table = Customer.#loadTable()
    const index = table.data.customers.findIndex(element => element.id === id)
    
    if (index != -1) {
      table.data.customers.splice(index, 1)
      table.write()
    }
  }

  static update(id, params) {
    const table = Customer.#loadTable()
    const index = table.data.customers.findIndex(element => element.id === id)
    const element = table.data.customers[index]

    params.username ||= element.username
    params.email ||= element.email
    params.password ||= element.password
    params.cpf ||= element.cpf
    params.phoneNumber ||= element.phoneNumber
    params.adress ||= element.adress

    if (index != -1) {
      Object.keys(params).forEach((key) => {
        table.data.customers[index][key] = params[key]
      })

      table.write()
    }
  }
}
