import { HttpResponse, HttRequest } from './http'

export interface Controller {
  handle: (httpRequest: HttRequest) => Promise<HttpResponse>
}
