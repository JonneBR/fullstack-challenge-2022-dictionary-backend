import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { MongoHelper } from '../mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
