import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Todo extends BaseModel {
  @hasOne(() => Category)
  public category: HasOne<typeof Category>

  @column()
  public category_id: number

  @column({ isPrimary: true })
  public id: number

  @column({})
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
