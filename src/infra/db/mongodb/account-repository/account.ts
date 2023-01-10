import { AddAccountRepository } from '@/data/protocols'
// import { AccountModel } from '@/domain/models'
// import { AddAccountModel } from '@/domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(
    account: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return result !== null
  }
}
