import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Priority from 'App/Models/Priority'
import { fieldsChecker } from '../../../util/requiredFields'

export default class PrioritiesController {
  public async index({}: HttpContextContract) {
    const priorities = Priority.query().select('id', 'status')

    return priorities
  }

  public async create({ request, response }: HttpContextContract) {
    const requiredFields = ['status']
    const body = request.body()

    try {
      fieldsChecker(requiredFields, body)
      const priority = await Priority.create(body)

      return response.status(402).send(priority)
    } catch (error) {
      return response.status(402).send(error.message)
    }
  }
}
