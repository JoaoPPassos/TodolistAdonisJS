import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { fieldsChecker } from '../../../util/requiredFields'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    response.header
    try {
      const user = await User.query()

      return response.header('Access-Control-Allow-Origin', '*').status(200).send(user)
    } catch (error) {}
  }

  public async create({ response, request }: HttpContextContract) {
    const body = request.body()
    const requiredFields = ['password', 'username', 'email']

    try {
      fieldsChecker(requiredFields, body)

      const user = await User.create(body)

      return response.status(200).send(user)
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  public async login({ response, request, auth }: HttpContextContract) {
    const body = request.body()
    if (request.method() === 'OPTIONS') {
      return response.status(200)
    }
    const requiredFields = ['password', 'email']
    try {
      fieldsChecker(requiredFields, body)

      const user = await User.findByOrFail('email', body.email)

      const validUser = await Hash.verify(user.password, body.password)

      if (!validUser) throw new Error('Usuário ou senha inválidos')

      const token = await auth.use('api').attempt(user.email, body.password)

      let userInfos = { ...user.$attributes, token }

      return response.header('access-control-allow-origin', '*').status(200).send(userInfos)
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  // public async get({ response, request }: HttpContextContract) {
  //   const body = request.body()
  //   const requiredFields = ['email', 'password']

  //   try {
  //     fieldsChecker(requiredFields, body)

  //     const user = await User.findByOrFail('email', body.email)

  //     let passwordIsRight = await Hash.verify(user.password, body.password)

  //     if (!passwordIsRight) throw new Error('Senha incorreta')

  //     return response.status(200).send(user)
  //   } catch (error) {
  //     return response.status(400).send(error.message)
  //   }
  // }
}
