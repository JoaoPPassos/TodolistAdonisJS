import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import User from './User'

export default class Todo extends BaseModel {
  @hasOne(() => Category)
  public category: HasOne<typeof Category>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public user_id: number

  @column()
  public category_id: number

  @column({ isPrimary: true })
  public id: number

  @column({})
  public name: string

  @column()
  public priority_id: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
