'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as HoverCard from '@radix-ui/react-hover-card';
import { CaretDown, SignOut, Plus, List, X } from "@phosphor-icons/react";
import { ModalAddCrypto } from "@/components/ModalAddCrypto";
import { TrBodyCrypto } from "@/components/TrBodyCrypto";
import { CardTradeCryptoForMobileScreen } from "@/components/CardTradeCryptoForMobileScreen";
import { useEffect, useState } from "react";
import { add, useAppSelector } from "@/redux/store";
import { fakeApi } from "@/services/api";
import { WalletDTO, UsersDTO } from "@/DTOs/fakeApiDTOs";
import { useDispatch } from "react-redux";

export default function Dashboard() {
  const [showCardCrypto, setShowCardCrypto] = useState(false)
  const [showDrawerMenu, setShowDrawerMenu] = useState(false)
  const [myWallet, setMyWallet] = useState<WalletDTO>({} = {} as WalletDTO)
  const userStore = useAppSelector(store => {
    return store.user
  })
  const [user, setUser] = useState<UsersDTO>(userStore)
  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(() => {
    const fetchLocalStorageUserId = localStorage.getItem('@edusynch-challenge-rafaelq/userId')
    async function loadMyUser() {
      const userIDLocalStorage = fetchLocalStorageUserId ? JSON.parse(fetchLocalStorageUserId) : {}
      const allUsersFound = (await fakeApi.get('/users')).data as UsersDTO[]

      if(userIDLocalStorage) {
        const userFound = allUsersFound.find((user) => user.id === userIDLocalStorage)

        if(userFound) {
          setUser(userFound)
          dispatch(add({
            userFound,
          }))
        }
      }
    }

    loadMyUser()    
  }, [dispatch])

  useEffect(() => {
    async function loadMyWallet() {
      const myWalletFound = (await fakeApi.get(`/wallets/${user.id}`)).data as WalletDTO
      if(myWalletFound) {
        setMyWallet(myWalletFound)
      }
    }

    if(user.id) {
      loadMyWallet()
    }
  }, [user.id])

  function handleLogout() {
    localStorage.removeItem('@edusynch-challenge-rafaelq/userId')
    router.back()
  }

  return (
    <main className="h-screen md:h-full flex flex-col bg-white xl:bg-secondary-150">
      <header 
        className="w-full flex justify-between items-center bg-white shadow-md py-4 px-6 md:px-12 xl:px-10"
        onClick={() => {showDrawerMenu && setShowDrawerMenu(false)}}
      >

        <div className="flex xl:hidden">
              <button 
                className="w-6 h-6 group active:rotate-180 duration-500 flex justify-center items-center border-2 border-secondary-500 rounded-full" 
                aria-label="Customise options"
                onClick={() => setShowDrawerMenu(!showDrawerMenu)}
              >
                {
                  showDrawerMenu
                  ?
                  <X className="text-secondary-500 flex" size={16} weight="bold" />
                  :
                  <List className="text-secondary-500 flex" size={16} weight="bold" />
                }
              </button>
        </div>

        <Image className="w-[95px] md:w-[7.75rem]" src="/logo.png" width={124} height={21} alt='coin synch logo' />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild className="cursor-pointer">
            <div className="flex justify-center items-center group">
              {user.id
              ?
              <>
                <Image className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2" src={user.avatar} width={32} height={32} alt={user.name} />
                <h6 className="label hidden md:flex text-text-base mr-1">
                  {user.name}
                </h6>
                <CaretDown className="hidden md:flex text-secondary-400 group-data-[state=open]:rotate-180 duration-100" size={16} weight="bold" />
                <CaretDown className="flex md:hidden text-secondary-400 group-data-[state=open]:rotate-180 duration-100" size={8} weight="bold" />
              </>
              :
              <>
                <Image className="animate-spin mr-2" src="/spinner_loading.png" width={20} height={20} alt='spinner loading' />
                <span>Loading ...</span>
              </>
              }
              
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="bg-white flex flex-col justify-center items-center rounded py-4 px-6 shadow divide-y" 
              sideOffset={5}
            >
              <div className="w-full flex justify-between items-center">
                <SignOut className="text-secondary-500 mr-4" size={16} weight="bold" />
                <button onClick={handleLogout} className="label text-secondary-500" >
                  Logout
                </button>
              </div>
              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </header>

      <div className="flex flex-1">
        {showDrawerMenu
        &&
          <aside className="relative flex xl:hidden">
            <div className="absolute w-screen h-full flex">
              <div className="w-56 md:w-60 h-full flex flex-col border-y-[1px] gap-8 py-12 pl-6 pr-8 border-secondary-300 bg-white">
                  <button className="flex items-center">
                    <Image className="w-6 h-6 md:w-8 md:h-8" src="/wallet_icon.png" width={32} height={32} alt="wallet icon" />
                    <span className="label text-text-base ml-4">
                      Lorem Ipsum
                    </span>
                  </button>
                
                  <button className="flex items-center">
                    <Image className="w-6 h-6 md:w-8 md:h-8" src="/flow_icon.png" width={32} height={32} alt="flow icon" />
                    <span className="label text-text-base ml-4">
                      Lorem Ipsum
                    </span>
                  </button>

                  <button className="flex items-center">
                    <Image className="w-6 h-6 md:w-8 md:h-8" src="/coin_icon.png" width={32} height={32} alt="coin icon" />
                    <span className="label text-text-base ml-4">
                      Lorem Ipsum
                    </span>
                  </button>

                  <button className="flex items-center">
                    <Image className="w-6 h-6 md:w-8 md:h-8" src="/business_icon.png" width={32} height={32} alt="business icon" />
                    <span className="label text-text-base ml-4">
                      Lorem Ipsum
                    </span>
                  </button>

                  <button 
                    className="flex items-center mt-12"
                    onClick={() => setShowDrawerMenu(false)}
                  >
                    <Image className="w-6 h-6 md:w-8 md:h-8" src="/arrow_left.png" width={32} height={32} alt="arrow left icon go back" />
                  </button>
              </div>

              <div className="flex flex-1 bg-secondary-900/70" onClick={() => {showDrawerMenu && setShowDrawerMenu(false)}} />
            </div>
          </aside>
        }

        <aside className="w-[5.375rem] hidden xl:flex flex-col border-y-[1px] gap-8 py-12 pl-6 pr-8 border-secondary-300 bg-white">
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <button>
                <Image src="/wallet_icon.png" width={32} height={32} alt="wallet icon" />
              </button>
            </HoverCard.Trigger>
            
            <HoverCard.Portal>
              <HoverCard.Content className="bg-primary-500 py-2 px-6 rounded" sideOffset={5} side="right">
                <h6 className="label text-white">
                  Lorem Ipsum
                </h6>
                <HoverCard.Arrow className="fill-primary-500" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>

          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <button>
                <Image src="/flow_icon.png" width={32} height={32} alt="flow icon" />
              </button>
            </HoverCard.Trigger>
            
            <HoverCard.Portal>
              <HoverCard.Content className="bg-primary-500 py-2 px-6 rounded" sideOffset={5} side="right">
                <h6 className="label text-white">
                  Lorem Ipsum
                </h6>
                <HoverCard.Arrow className="fill-primary-500" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>

          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <button>
                <Image src="/coin_icon.png" width={32} height={32} alt="coin icon" />
              </button>
            </HoverCard.Trigger>
            
            <HoverCard.Portal>
              <HoverCard.Content className="bg-primary-500 py-2 px-6 rounded" sideOffset={5} side="right">
                <h6 className="label text-white">
                  Lorem Ipsum
                </h6>
                <HoverCard.Arrow className="fill-primary-500" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>

          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <button>
                <Image src="/business_icon.png" width={32} height={32} alt="business icon" />
              </button>
            </HoverCard.Trigger>
            
            <HoverCard.Portal>
              <HoverCard.Content className="bg-primary-500 py-2 px-6 rounded" sideOffset={5} side="right">
                <h6 className="label text-white">
                  Lorem Ipsum
                </h6>
                <HoverCard.Arrow className="fill-primary-500" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </aside>

        <div className="flex flex-col items-center flex-1 mb-6 md:mb-[15.4375rem] xl:mb-[19.1875rem]">
          <div className="w-[272px] md:w-[42rem] xl:w-[76rem] flex flex-col xl:flex-row bg-transparent mt-6 md:mt-10 xl:mt-14 gap-4 md:gap-8">
            <div className="md:w-full xl:w-[50%] flex rounded-lg shadow-lg border">
              <div className="w-[50%] bg-white flex items-center rounded-s-lg py-2 xl:py-6 pl-4 xl:pl-6">
                <Image className="w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16" src="/balance_law_icon.png" width={64} height={64} alt="balance law icon" />
                <div className="flex flex-col ml-2 md:ml-4">
                  <h4 className="label md:h5 xl:h4 text-text-base">
                    Balance <span className="small-label block md:inline-block md:h5 xl:h4 text-secondary-500 md:text-text-base">in US$</span>
                  </h4>
                  <h6 className="hidden md:flex md:label xl:body text-secondary-500">
                    (approximately)
                  </h6>
                </div>
              </div>

              <div className="w-[50%] bg-primary-100 flex justify-center items-center rounded-e-lg py-3 md:py-4 xl:py-9">
                <h3 className="body md:h4 xl:h3 text-text-base">
                  <span className="font-bold">${myWallet.balance ? new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(myWallet.balance) : ' 0.00'}</span>
                </h3>
              </div>
            </div>

            <div className="md:w-full xl:w-[50%] flex gap-4 md:gap-8">
              <div className="w-[50%] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
                <div className="bg-white flex flex-col pt-2 pl-2 pr-2">
                  <h6 className="w-max small-label text-secondary-500">
                    Daily Variation
                  </h6>
                  <div className="flex items-center mt-4 mb-2">
                    <Image className="w-4 h-4 md:w-6 md:h-6" src="/ethereum_icon.png" width={24} height={24} alt="ethereum icon" />
                    <h6 className="small-label md:label text-text-base ml-2">
                      ETH
                      <span className={`inline-flex ml-2 md:hidden label ${'+5,65%'[0] === '+' ? "text-tertiary-700" : "text-quartenary-700"}`}>
                        +5,65%
                      </span>
                    </h6>
                  </div>
                  <h6 className={`hidden md:flex body ${'+5,65%'[0] === '+' ? "text-tertiary-700" : "text-quartenary-700"}`}>
                    +5,65%
                  </h6>
                </div>

                <div className="flex flex-1 h-20 md:h-full">
                  <Image className="w-full object-cover" src="/fake_statistics.png" width={143} height={112} alt="fake statistics" />
                </div>
              </div>

              <div className="w-[50%] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
                <div className="md:w-[50%] bg-white flex flex-col pt-2 pl-2 md:pt-4 md:pl-4">
                  <h6 className="small-label md:label text-text-base font-bold">
                    NFT’s NEWS
                  </h6>
                  <h6 className="small-label text-secondary-500 mt-[0.3125rem] mb-2 md:mb-4">
                    New ElephantX NFT <span className="inline-block">to be lauched!</span>
                  </h6>
                  <Link href="https://www.google.com.br/" target="_blank" className="hidden md:flex small-label text-primary-400" >
                    Read more +
                  </Link>
                </div>

                <div className="md:w-[50%] flex h-20 md:h-full">
                  <Image className="w-full object-cover" src="/eduphantsNormal.png" width={143} height={112} alt="elephant paint" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[272px] md:hidden">
            <div className="flex justify-between items-center border-t-[1px] border-secondary-300 mt-6 pt-6">
              <div className="flex items-center">
                <Image className="w-6 h-6 md:w-8 md:h-8" src="/wallet_icon.png" width={32} height={32} alt="wallet icon" />
                <h4 className="h5 md:h4 text-text-base ml-4">
                  <span className="font-bold">My Wallet</span>
                </h4>
              </div>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="btn-primary label rounded-full p-[6px] md:py-2 md:px-4">
                    <Plus className="text-white" size={14} weight="bold" />
                    <span className="hidden md:flex">Add crypto</span>
                  </button>
                </Dialog.Trigger>
                <ModalAddCrypto />
              </Dialog.Root>
            </div>
          </div>

          <div className="w-[272px] md:w-[42rem] xl:w-[76rem] bg-white rounded-lg md:shadow-lg mt-4 md:mt-8 md:overflow-hidden">
            <div className="hidden md:flex justify-between items-center border-b-[1px] border-secondary-200 p-6">
              <div className="flex items-center">
                <Image className="w-6 h-6 md:w-8 md:h-8" src="/wallet_icon.png" width={32} height={32} alt="wallet icon" />
                <h4 className="h5 md:h4 text-text-base ml-4">
                  <span className="font-bold">My Wallet</span>
                </h4>
              </div>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="btn-primary label rounded-full p-[6px] md:py-2 md:px-4">
                    <Plus className="text-white" size={14} weight="bold" />
                    <span className="hidden md:flex">Add crypto</span>
                  </button>
                </Dialog.Trigger>
                <ModalAddCrypto />
              </Dialog.Root>
            </div>

            {myWallet.id && myWallet.cryptos.length <= 0
            ?
              <div className="flex flex-col flex-1 justify-center items-center py-20">
                <div className="flex flex-col justify-center items-center">
                  <Image src="/wallet_empty_icon.png" width={82} height={68} alt="wallet empty icon" />
                  <h5 className="text-text-base font-bold mt-6 mb-2">
                    Nothing here yet...
                  </h5>
                  <h6 className="label text-text-base">
                    Add a crypto and start earning
                  </h6>
                </div>
              </div>
            :
            myWallet.id ?
            <>
              <div className="hidden md:flex flex-col flex-1 justify-center items-center pt-6">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-end pr-1 label text-secondary-500">#</th>
                      <th className="flex text-start ml-10 xl:ml-[7.5rem] label text-secondary-500">Crypto</th>
                      <th className="text-start label text-secondary-500">Holdings</th>
                      <th className="text-start label text-secondary-500">Change</th>
                      <th className="text-center label text-secondary-500">Trade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      myWallet.cryptos.map((crypto, index) => 
                        <TrBodyCrypto 
                          key={crypto.id}
                          indiceValue={(index+1).toString().padStart(2, '0')}
                          urlImage={crypto.url ? crypto.url : '/bitcoin_icon.png'}
                          cryptoValue={crypto.nameCrypto}
                          cryptoInitialsValue={crypto.asset_id}
                          priceValue={`US$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(Number(crypto.holdings))}`}
                          changeValue={Number(crypto.change) > 0 ? '+'+crypto.change : '-'+crypto.change}
                          actionBuy={() => {}}
                          detailPrice="434 BTC"
                        />
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className="grid md:hidden grid-cols-2 gap-4 mb-4">
                {
                  myWallet.cryptos.map((crypto, index) => 
                    {
                      return (
                        (index+1) <= 4 
                          ?
                            <CardTradeCryptoForMobileScreen 
                              key={crypto.id}
                              urlImage={crypto.url ? crypto.url : '/bitcoin_icon.png'}
                              cryptoValue={crypto.nameCrypto}
                              cryptoInitialsValue={crypto.asset_id}
                              priceValue={`US$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(Number(crypto.holdings))}`}
                              changeValue={Number(crypto.change) > 0 ? '+'+crypto.change : '-'+crypto.change}
                              detailPrice="434 BTC"
                            />
                          : showCardCrypto &&
                            <CardTradeCryptoForMobileScreen 
                              key={crypto.id}
                              urlImage={crypto.url ? crypto.url : '/bitcoin_icon.png'}
                              cryptoValue={crypto.nameCrypto}
                              cryptoInitialsValue={crypto.asset_id}
                              priceValue={`US$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(Number(crypto.holdings))}`}
                              changeValue={Number(crypto.change) > 0 ? '+'+crypto.change : '-'+crypto.change}
                              detailPrice="434 BTC"
                            />
                      )
                    }
                  )
                }
              </div>
              {
              !showCardCrypto
              &&
                <div className="flex md:hidden justify-center items-center mt-6">
                  <button 
                    className="text-primary-500 flex items-center label hover:text-primary-400"
                    onClick={() => setShowCardCrypto(!showCardCrypto)}
                  >
                    View more
                    <Plus className="text-primary-500 hover:text-primary-400 ml-2" size={12} weight="bold" />
                  </button>
                </div>
              }
            </>
            :
              <div className="flex justify-center items-center py-6">
                <Image className="animate-spin mr-2" src="/spinner_loading.png" width={20} height={20} alt='spinner loading' />
                <span>Loading ...</span>
              </div>
            }

          </div>
        </div>
      </div>

      <footer 
        className="w-full flex justify-center md:justify-between xl:justify-center items-center bg-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.10)] px-12 py-5 xl:py-6"
        onClick={() => {showDrawerMenu && setShowDrawerMenu(false)}}
      >
        <h6 className="small-label md:label text-text-base">
          Copyright © 2022 -  All rights reserved
        </h6>
        <Image className="hidden md:flex xl:hidden w-auto h-auto" src="/logo.png" width={95} height={16} alt='coin synch logo' />
      </footer>
    </main>
  )
}