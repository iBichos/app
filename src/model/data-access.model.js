import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class DataAccessModel {
  static async list() {
    try {
      const registers = await prisma[this.tableName].findMany({})

      let list = []
      registers.forEach((register) => {
        list.push(new this(register))
      })

      return list
    } catch(e) { 
      console.log(e) 
    }
  }

  static async find(id) {
    try {
      const register = await prisma[this.tableName].findUnique({ where: { id: parseInt(id) }})
      return new this(register)
    } catch(e) { 
      console.log(e) 
    }
  }

  static async findByField(field, value) {
    try {
      const register = await prisma[this.tableName].findUnique({ where: { [field]:value } })
      return new this(register)
    } catch(e) { 
      console.log(e) 
    }
  }

  static async delete(id) {
    try {
      await prisma[this.tableName].delete({ where: { id: parseInt(id) }})
    } catch(e) { 
      console.log(e) 
    }
  }

  static async create(params) {
    try {
      let paramsToCreate = {}
      this.fields.forEach((field) => {
        if (params[field] !== null) {
          paramsToCreate[field] = params[field]
        } else {
          paramsToCreate[field] = null
        }
      })

      const register = await prisma[this.tableName].create({ data: paramsToCreate })

      return new this(register)
    } catch(e) { 
      console.log(e) 
    }
  }

  static async update(id, params) {
    try {
      let paramsToUpdate = {}
      this.fields.forEach((field) => {
        if (params[field] !== null && params[field] !== undefined) {
          paramsToUpdate[field] = params[field]
        }
      })

      const register = await prisma[this.tableName].update({
        where: { id: id },
        data: paramsToUpdate,
      })

      return new this(register)
    } catch(e) { 
      console.log(e) 
    }
  }
}