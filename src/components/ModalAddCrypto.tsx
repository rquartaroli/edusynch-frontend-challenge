import { X, CaretDown, CaretRight } from "@phosphor-icons/react"
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select';
import { InputDynamicForModal } from './InputDynamicForModal'
import Image from "next/image";

export function ModalAddCrypto() {
  const fakeListCryptos = [
    {
      urlImage: '/bitcoin_icon.png',
      cryptoName: 'Bitcoin',
      cryptoInitialsName: 'BTC',
    },
    {
      urlImage: '/ethereum_icon.png',
      cryptoName: 'Ethereum',
      cryptoInitialsName: 'ETH',
    },
    {
      urlImage: '/cardano_icon.png',
      cryptoName: 'Cardano',
      cryptoInitialsName: 'ADA',
    },
    {
      urlImage: '/solana_icon.png',
      cryptoName: 'Solana',
      cryptoInitialsName: 'SOL',
    },
    {
      urlImage: '/usdcoin_icon.png',
      cryptoName: 'USD Coin',
      cryptoInitialsName: 'USDC',
    },
  ]

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-text-base/90 inset-0 fixed" />
      <Dialog.Content className="fixed bg-white p-4 md:p-6 xl:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[272px] md:w-80 xl:w-[448px]">
        <Dialog.Title className="body md:h5 xl:h4 text-text-base flex justify-center">
          <span className="font-bold">Add Crypto</span>
        </Dialog.Title>
        <fieldset className="flex flex-col gap-4 xl:gap-6 items-center mt-6">
          
          <Select.Root>
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
                    {fakeListCryptos.length > 0 
                    &&
                      fakeListCryptos.map((crypto) => 
                        <div key={crypto.cryptoName}>
                          <Select.Item value={crypto.cryptoName} className="label text-text-base relative flex justify-between items-center py-4 px-6 rounded cursor-pointer hover:bg-secondary-100">
                            <Select.SelectItemText>
                              <div className="flex items-center">
                                <Image className="mr-2" src={crypto.urlImage} width={16} height={16} alt={crypto.cryptoName} />
                                  {crypto.cryptoName}&nbsp;
                                <span className="text-secondary-500">{crypto.cryptoInitialsName}</span>
                              </div>
                            </Select.SelectItemText>
                            <CaretRight className="text-secondary-300 hover:text-secondary-300/50" size={25} weight="bold" />
                          </Select.Item>
                          <Select.Separator className="h-[1px] bg-secondary-200" />
                        </div>
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
          />
        </fieldset>
        
        <fieldset className="flex flex-col items-center">
          <Dialog.Close asChild aria-label="Close">
            <button className="btn-primary w-60 md:w-[272px] xl:w-[384px] h-[48px] body py-3 mt-6 xl:mt-8">
              Add Crypto
            </button>
          </Dialog.Close>
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