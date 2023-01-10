import { AddAccountRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(account)
    return await new Promise((resolve) => {
      resolve({
        id: 'string',
        name: 'string',
        email: 'string',
        password: 'string'
      })
    })
  }
}
