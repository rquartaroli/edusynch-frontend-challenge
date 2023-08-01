import axios from "axios"

export const API_KEY = ''

export const fakeApi = axios.create({
  baseURL: "http://localhost:3333",
})

export const coinApi = axios.create({
  baseURL: "https://rest.coinapi.io/v1",
})