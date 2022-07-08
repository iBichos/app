import axios from  'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class DataAccessModel {
  static async list() {
    const registers = await prisma[this.tableName].findMany({})

    let list = []
    registers.forEach((register) => {
      list.push(new this(register))
    })

    return list
  }

  static async find(id) {
    const register = await prisma[this.tableName].findUnique({ where: { id: parseInt(id) }})
    return new this(register) 
  }

  static async findByField(field, value) {
    const register = await prisma[this.tableName].findUnique({ where: { [field]:value } })

    return new this(register)
  }

  static async delete(id) {
    await prisma[this.tableName].delete({ where: { id: parseInt(id) }})
  }

  static async create(params) {
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
  }

  static async update(id, params) {
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
  }
}