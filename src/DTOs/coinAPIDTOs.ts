export type QuotesTop = {
  symbol_id: string
  time_exchange: string
  time_coinapi: string
  ask_price: number
  ask_size: number
  bid_price: number
  bid_size: number
}

export type QuotesWithFilter = {
  symbol_id: string
  ask_price: number
  ask_size: number
  bid_price: number
  bid_size: number
  last_trade: {
    uuid: string,
    price: number
    size: number
  }
}