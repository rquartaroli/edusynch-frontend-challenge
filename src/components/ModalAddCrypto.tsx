import { X, CaretDown, CaretRight } from "@phosphor-icons/react"
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select';
import { InputDynamicForModal } from './InputDynamicForModal'
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_KEY, coinApi, fakeApi } from "@/services/api";
import { QuotesTop, QuotesWithFilter } from "@/DTOs/coinAPIDTOs";
import { getAssetID, getAssetName } from "@/utils/getAssetID";
import { assets } from "@/utils/assets_icons";
import { CryptoInMyWallet, WalletDTO } from "@/DTOs/fakeApiDTOs";
import { useAppSelector } from "@/redux/store";
import { generateRandomID } from "@/utils/generateRandomID";

export function ModalAddCrypto() {
  const [cryptoSymbolIDSelected, setCryptoSymbolIDSelected] = useState("")
  const [quantityCrypto, setQuantityCrypto] = useState(0)
  const [quotes, setQuotes] = useState<QuotesTop[]>([])
  const userStore = useAppSelector(store => {
    return store.user
  })

  function handleSelectChange(event: string) {
    setCryptoSymbolIDSelected(event)
  }

  async function handleAddCrypto() {
    try {
      if(quantityCrypto > 0) {
        const cryptosFounds = await coinApi.get(`/quotes/current?filter_symbol_id=${cryptoSymbolIDSelected}`, 
          {
            headers: {
              "Content-type": 'application/json',
              "X-CoinAPI-Key": API_KEY
            }
          }
        ).then((response) => response.data) as QuotesWithFilter[]

        const cryptoSelected = cryptosFounds.find(crypto => crypto.symbol_id === cryptoSymbolIDSelected) as QuotesWithFilter
        const urlSelected = assets.find(asset => asset.asset_id === getAssetID(cryptoSymbolIDSelected))

        const priceHolding = cryptoSelected.ask_price * cryptoSelected.ask_size
        const changeVariaty = ((cryptoSelected.ask_price - cryptoSelected.last_trade.price)/cryptoSelected.last_trade.price)*100

        if(userStore.id) {
          const myWalletFound = (await fakeApi.get(`/wallets/${userStore.id}`)).data as WalletDTO

          if(myWalletFound.cryptos.length <= 0) {
            const addFirstCrypto = {
              id: generateRandomID(36),
              symbol_id: cryptoSymbolIDSelected,
              url: urlSelected ? urlSelected.url : '/bitcoin_icon.png',
              nameCrypto: getAssetName(cryptoSymbolIDSelected),
              asset_id: getAssetID(cryptoSymbolIDSelected),
              holdings: priceHolding,
              quantity: quantityCrypto,
              change: changeVariaty.toFixed(2)
            }

            await fakeApi.put(`/wallets/${userStore.id}`, { cryptos: [addFirstCrypto], balance: priceHolding })
          } else {
            const fetchCryptoInWallet = myWalletFound.cryptos.find(crypto => crypto.symbol_id === cryptoSymbolIDSelected)
            if(fetchCryptoInWallet) {
              let newBalance = myWalletFound.balance
              const updateCryptoExists = myWalletFound.cryptos.map(crypto => {
                if(crypto.symbol_id === cryptoSymbolIDSelected) {
                  newBalance += Number(crypto.holdings) + priceHolding
                  return {
                    ...crypto,
                    holdings: crypto.holdings + priceHolding,
                    quantity: crypto.quantity + quantityCrypto,
                    change: changeVariaty.toFixed(2)
                  }
                } else {
                  return crypto
                }
              })

              await fakeApi.put(`/wallets/${userStore.id}`, { cryptos: updateCryptoExists, balance: newBalance })
            } else {
              const addCrypto = {
                id: generateRandomID(36),
                symbol_id: cryptoSymbolIDSelected,
                url: urlSelected ? urlSelected.url : '/bitcoin_icon.png',
                nameCrypto: getAssetName(cryptoSymbolIDSelected),
                asset_id: getAssetID(cryptoSymbolIDSelected),
                holdings: priceHolding,
                quantity: quantityCrypto,
                change: changeVariaty.toFixed(2)
              }

              const newBalance = myWalletFound.balance + addCrypto.holdings
  
              await fakeApi.put(`/wallets/${userStore.id}`, { cryptos: [...myWalletFound.cryptos, addCrypto], balance: newBalance })
            }
          }
        }
        setQuantityCrypto(0)
      } else {
        alert('The value must be greater than 0')
      }
    } catch (error) {
      console.log('ERROR')
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchTopCryptos() {
      const cryptos = await coinApi.get('/quotes/latest?limit=5', 
        {
          headers: {
            "Content-type": 'application/json',
            "X-CoinAPI-Key": API_KEY
          }
        }
      )

      if(cryptos.data) {
        setQuotes(cryptos.data)
      }
    }

    fetchTopCryptos()
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-text-base/90 inset-0 fixed" />
      <Dialog.Content className="fixed bg-white p-4 md:p-6 xl:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[272px] md:w-80 xl:w-[448px]">
        <Dialog.Title className="body md:h5 xl:h4 text-text-base flex justify-center">
          <span className="font-bold">Add Crypto</span>
        </Dialog.Title>
        <fieldset className="flex flex-col gap-4 xl:gap-6 items-center mt-6">
          
          <Select.Root onValueChange={(e) => handleSelectChange(e)}>
            <Select.Trigger 
              className="flex justify-between items-center w-60 md:w-[272px] xl:w-[384px] h-[48px] p-4 body text-text-base border border-secondary-300 rounded-md group"
              aria-label="Crypto"
            >
              <Select.Value placeholder="Choose" />
              <Select.Icon>
                <CaretDown 
                  className="text-secondary-300 hover:text-secondary-200 group-data-[state=open]:text-primary-500 group-data-[state=open]:rotate-180 duration-100" size={25} weight="bold" />
              </Select.Icon>
            </Select.Trigger>
            
            <Select.Portal>
              <Select.Content 
                className="overflow-hidden w-60 md:w-[272px] xl:w-[384px] bg-white border border-secondary-300 rounded-md shadow-lg mt-2"
                position="popper"
              >
                <Select.Viewport>
                  <Select.Group>
                    {quotes.length > 0 
                    &&
                      quotes.map((quote, index) => {
                        let urlAsset = assets.find(asset => asset.asset_id === getAssetID(quote.symbol_id))
                        return (
                          <div key={quote.ask_price + (index+1)}>
                            <Select.Item value={quote.symbol_id} className="label text-text-base relative flex justify-between items-center py-4 px-6 rounded cursor-pointer hover:bg-secondary-100">
                              <Select.SelectItemText>
                                <div className="flex items-center">
                                  <Image className="mr-2" src={urlAsset ? urlAsset.url : "/bitcoin_icon.png"} width={16} height={16} alt={getAssetName(quote.symbol_id)} />
                                    {getAssetName(quote.symbol_id)}&nbsp;
                                  <span className="text-secondary-500">{getAssetID(quote.symbol_id)}</span>
                                </div>
                              </Select.SelectItemText>
                              <CaretRight className="text-secondary-300 hover:text-secondary-300/50" size={25} weight="bold" />
                            </Select.Item>
                            <Select.Separator className="h-[1px] bg-secondary-200" />
                          </div>
                        )
                        }
                      )
                    }
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          
          <InputDynamicForModal 
            id="quantityModal"
            type="number"
            className="w-full text-secondary-400 label md:body focus:outline-none"
            placeholder="0.00"
            step="0.05"
            min="0"
            onChange={(e) => setQuantityCrypto(Number(e.target.value))}
          />
        </fieldset>
        
        <fieldset className="flex flex-col items-center">
            <button type="button" onClick={handleAddCrypto} className="btn-primary w-60 md:w-[272px] xl:w-[384px] h-[48px] body py-3 mt-6 xl:mt-8">
              Add Crypto
            </button>
        </fieldset>
        
        <Dialog.Close asChild aria-label="Close">
          <button className="w-6 h-6 inline-flex items-center justify-center rounded-full absolute top-3 md:top-4 right-4" aria-label="Close">
            <X className="text-secondary-500 hover:text-zinc-400" size={16} weight="bold" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}