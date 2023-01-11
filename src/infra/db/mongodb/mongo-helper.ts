import { MongoClient, Collection } from 'mongodb'
import env from '../../../main/config/env'

export const MongoHelper = {
  client: new MongoClient(env.mongoUrl),

  async connect(url: string = env.mongoUrl): Promise<void> {
    await this.client.connect()
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db('dictionary').collection(name)
  }
}
