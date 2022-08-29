// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import { updatingField } from '../../../util/updateModel'
import { fieldsChecker } from '../../../util/requiredFields'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TodolistsController {
  public async index({ auth }: HttpContextContract) {
    const user_id = auth.user.id

    const todos = await Database.from('todos as t')
      .select(
        `t.*`,
        'c.name as category_name',
        'c.color as category_color',
        'p.status as priority_status'
      )
      .leftJoin('categories as c', 't.category_id', 'c.id')
      .leftJoin('priorities as p', 'p.id', 't.priority_id')
      .where('t.user_id', user_id)

    return todos
  }

  public async create({ request, response, auth }: HttpContextContract) {
    const requiredFields = ['name', 'description', 'category_id', 'priority_id']
    const body = request.body()
    const user_id = auth.user.id

    try {
      fieldsChecker(requiredFields, body)
      const todo = await Todo.create({
        ...body,
        user_id,
      })
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
