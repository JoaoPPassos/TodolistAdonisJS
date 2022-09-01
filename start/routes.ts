/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'TodolistsController.index')
  Route.post('/', 'TodolistsController.create')
  Route.put('/:id', 'TodolistsController.update')
  Route.delete('/:id', 'TodolistsController.delete')
})
  .middleware('auth')
  .prefix('todolist/todo')

Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.post('/', 'CategoriesController.create')
  Route.put('/:id', 'CategoriesController.update')
  Route.delete('/:id', 'CategoriesController.delete')
})
  .middleware('auth')
  .prefix('todolist/categories')

Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.post('/', 'UsersController.create')
  Route.post('/login', 'UsersController.login')
}).prefix('todolist/user')

Route.group(() => {
  Route.get('/', 'PrioritiesController.index')
  Route.post('/', 'PrioritiesController.create')
}).prefix('todolist/priority')
