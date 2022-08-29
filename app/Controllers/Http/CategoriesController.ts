import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { updatingField } from '../../../util/updateModel'
import { fieldsChecker } from '../../../util/requiredFields'

export default class CategoriesController {
  public async index({ auth }: HttpContextContract) {
    const user_id = auth?.user?.id || 0
    const categories = Category.query().where('user_id', user_id)

    return categories
  }

  public async create({ response, request, auth }: HttpContextContract) {
    const body = request.body()
    const requiredFields = ['name', 'color']
    const user_id = auth?.user?.id

    try {
      fieldsChecker(requiredFields, body)

      const category = await Category.create({ ...body, user_id })

      return response.status(202).send(category)
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  public async update({ response, request }: HttpContextContract) {
    const params = request.params()
    const body = request.body()

    try {
      const category = await Category.findOrFail(Number(params.id))

      Object.keys(body).forEach((key) => {
        console.log(body[key])

        updatingField(category, key, body[key])
      })
      await category.save()

      return response.status(200).send(category)
    } catch (error) {}
  }

  public async delete({ request, response }: HttpContextContract) {
    const params = request.params()

    try {
      const category = await Category.findOrFail(Number(params.id))

      await category.delete()

      return response.status(200).send(category)
    } catch (error) {}
  }
}
