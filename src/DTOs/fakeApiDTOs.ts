export type SubscribersDTO = {
  id: string
  email: string
}

export type UsersDTO = {
  id: string
  name: string
  email: string
  password: string
  terms_accepted: boolean
  avatar: string
}

export type CryptoInMyWallet = {
  id: string
  symbol_id: string
  url: string
  nameCrypto: string
  asset_id: string
  holdings: string
  quantity: number
  change: string
}

export type WalletDTO = {
  id: string
  cryptos: CryptoInMyWallet[]
  balance: number
}