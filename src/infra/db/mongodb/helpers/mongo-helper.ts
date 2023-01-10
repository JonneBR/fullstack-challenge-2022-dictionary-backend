import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: {} as MongoClient,

  async connect(url: string | undefined): Promise<void> {
    const env = process.env.MONGO_URL
    if (env) {
      this.client = await MongoClient.connect(env)
    }
  },
  async disconnect(): Promise<void> {
    await this.client.close()
  }
}
