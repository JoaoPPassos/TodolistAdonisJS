// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import { updatingField } from '../../../util/updateModel'
import { fieldsChecker } from '../../../util/requiredFields'

export default class TodolistsController {
  public async index() {
    const todos = Todo.query()
    return todos
  }

  public async create({ request, response }: HttpContextContract) {
    const requiredFields = ['name', 'description', 'category_id']
    const body = request.body()

    try {
      fieldsChecker(requiredFields, body)

      const todo = await Todo.create(body)
      return response.status(201).send(todo)
    } catch (error) {
      return response.status(402).send(error.message)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const params = request.params()
    const body = request.body()

    try {
      const todo = await Todo.findOrFail(Number(params.id))

      Object.keys(body).forEach((key) => {
        updatingField(todo, key, body[key])
      })

      await todo.save()

      return response.status(200).send(todo)
    } catch (error) {}
  }

  public async delete({ request, response }: HttpContextContract) {
    const params = request.params()

    try {
      const todo = await Todo.findOrFail(Number(params.id))

      if (!todo) throw new Error('Todo não encontrado')
      await todo.delete()

      return response.status(200).send(todo)
    } catch (error) {
      return response.status(400)
    }
  }
}
