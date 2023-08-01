'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { z } from "zod";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ArrowRight, Plus, List, X } from "@phosphor-icons/react"
import { CardInfo } from "@/components/CardInfo"
import { Tag } from "@/components/Tag"
import { TrBodyCrypto } from "@/components/TrBodyCrypto"
import { ModalSignIn } from "@/components/ModalSignIn";
import { ModalSignUp } from "@/components/ModalSignUp";
import { PriceInNews } from "@/components/PriceInNews";
import { TrBodyCryptoForMobile } from "@/components/TrBodyCryptoForMobile";
import { API_KEY, coinApi, fakeApi } from "@/services/api";
import { SubscribersDTO } from "@/DTOs/fakeApiDTOs";
import { generateRandomID } from "@/utils/generateRandomID";
import { getAssetID, getAssetName } from "@/utils/getAssetID";
import { assets } from "@/utils/assets_icons";
import { QuotesTop } from "@/DTOs/coinAPIDTOs";

const schemaSubscribeValidate = z.string().email('Email invalid!')

const animation = { duration: 25000, easing: (t: any) => t }

export default function Home() {
  const [sliderRef] = useKeenSlider(
    {
      mode: "free-snap",
      slides: {
        origin: "center",
        perView: 1.3,
      },
    },
  )
  const [sliderPriceRef] = useKeenSlider(
    {
      loop: true,
      renderMode: "performance",
      drag: false,
      slides: () => [
        {
          size: 1.4,
          spacing: 0.8,
        },
        {
          size: 1.4,
          spacing: 0.8,
        },
      ],
      created(s) {
        s.moveToIdx(2, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 2, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 2, true, animation)
      },
    },
  )
  const [sliderCardsRef] = useKeenSlider(
    {
      mode: "free-snap",
      slides: {
        origin: "auto",
        perView: 1.15,
      },
    },
  )

  const [showAllCryptos, setShowAllCryptos] = useState(false)
  const [loadingSubscribe, setLoadingSubscribe] = useState(false)
  const [emailSubscribe, setEmailSubscribe] = useState("")

  const [quotes, setQuotes] = useState<QuotesTop[]>([])

  useEffect(() => {
    async function fetchTopCryptos() {
      const cryptos = await coinApi.get('/quotes/latest?limit=10', 
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

  async function handleSubscribe() {
    try {
      setLoadingSubscribe(true)
      schemaSubscribeValidate.parse(emailSubscribe)

      const subscribers = (await fakeApi.get('/subscribers')).data as SubscribersDTO[]

      const subscriberFound = subscribers.find((subscriber) => subscriber.email === emailSubscribe)

      if(subscriberFound) {
        alert('This email is already a subscriber!')
        setLoadingSubscribe(false)
        return
      }

      const newSubscriber = {
        id: generateRandomID(36),
        email: emailSubscribe
      } as SubscribersDTO

      await fakeApi.post('/subscribers', newSubscriber)

      alert('Email registered successfully!')
      setEmailSubscribe("")
      setLoadingSubscribe(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert('Email invalid!')
      } else {
        alert('Internal Server Error!')
      }
      setLoadingSubscribe(false)
    }
  }
  
  return (
    <main className="w-full flex flex-col bg-white items-center">
      <header className="w-full flex items-center justify-center shadow xl:shadow-md">
        <div className="w-[272px] md:w-[42rem] xl:w-[76rem] h-16 flex items-center justify-between">
          <nav className="flex items-center">
            <Image className="mr-10" src="/logo.png" width={124} height={21} alt='coin synch logo' />
            <Link className="hidden md:flex label text-text-base mr-6 hover:text-zinc-400" href="/">
              About us
            </Link>
            <Link className="hidden md:flex label text-text-base hover:text-zinc-400" href="/">
              Top Crytos
            </Link>
          </nav>
          <nav className="flex items-center">
            <div className="hidden xl:flex">
              <div ref={sliderPriceRef} className="keen-slider max-w-[22.5rem] mr-20 px-4 text-clip overflow-hidden whitespace-nowrap">
                <div className="keen-slider__slide number-slide1">
                  <span className="label text-secondary-800 mr-6">
                    BIT
                    <span className="ml-2 text-text-base">R$23,62</span>
                    <span className="ml-2 text-tertiary-700">+7,082</span>
                  </span>
                
                  <span className="label text-secondary-800 mr-6">
                    DOG
                    <span className="ml-2 text-text-base">R$23,62</span>
                    <span className="ml-2 text-quartenary-700">-5,230</span>
                  </span>
                  <span className="label text-secondary-800 mr-6">
                    ETH
                    <span className="ml-2 text-text-base">R$23,62</span>
                    <span className="ml-2 text-tertiary-700">+1,023</span>
                  </span>
                </div>
                <div className="keen-slider__slide number-slide2">
                  <span className="label text-secondary-800 mr-6">
                    BIT
                    <span className="ml-2 text-text-base">R$23,62</span>
                    <span className="ml-2 text-tertiary-700">+7,082</span>
                  </span>
                
                  <span className="label text-secondary-800 mr-6">
                    DOG
                    <span className="ml-2 text-text-base">R$23,62</span>
                    <span className="ml-2 text-quartenary-700">-5,230</span>
                  </span>
                  <span className="label text-secondary-800 mr-6">
                    ETH
                    <span className="ml-2 text-text-base">R$23,62</span>
                    <span className="ml-2 text-tertiary-700">+1,023</span>
                  </span>
                </div>
              </div>
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="hidden md:flex label text-text-base mr-6 hover:text-zinc-400">Sign in</button>
              </Dialog.Trigger>
              <ModalSignIn />
            </Dialog.Root>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="hidden md:flex btn-primary w-[100px] label py-2 px-4">
                  Sign up
                </button>
              </Dialog.Trigger>
              <ModalSignUp />
            </Dialog.Root>

            <div className="flex md:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="w-6 h-6 group data-[state=open]:rotate-180 duration-500 flex justify-center items-center border-2 border-secondary-500 rounded-full" aria-label="Customise options">
                    <List className="text-secondary-500 flex group-data-[state=open]:hidden" size={16} weight="bold" />
                    <X className="text-secondary-500 hidden group-data-[state=open]:flex" size={16} weight="bold" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content 
                    className="bg-primary-500 flex flex-col justify-center items-center rounded-md p-1 divide-y" 
                    sideOffset={5}
                  >
                    <DropdownMenu.Item className="label p-2 text-white hover:text-secondary-400">
                      About us
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="label p-2 text-white hover:text-secondary-400">
                      Top Crytos
                    </DropdownMenu.Item>

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="flex label p-2 text-white hover:text-secondary-400">Sign in</button>
                      </Dialog.Trigger>
                      <ModalSignIn />
                    </Dialog.Root>

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="flex label p-2 text-white hover:text-secondary-400">
                          Sign up
                        </button>
                      </Dialog.Trigger>
                      <ModalSignUp />
                    </Dialog.Root>

                    <DropdownMenu.Arrow className="fill-primary-500" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
            
          </nav>
        </div>
      </header>
      <div className="flex xl:hidden w-full items-center justify-center shadow-md">
        <div ref={sliderPriceRef} className="keen-slider max-w-[22.5rem] md:mr-20 px-4 text-clip overflow-hidden whitespace-nowrap">
          <div className="keen-slider__slide number-slide1">
            <PriceInNews 
              cryptoInitialsValue="BIT"
              price="R$23,62"
              changeValue="+7,082"
            />
            <PriceInNews 
              cryptoInitialsValue="DOG"
              price="R$23,62"
              changeValue="-5,230"
            />
            <PriceInNews 
              cryptoInitialsValue="ETH"
              price="R$23,62"
              changeValue="+1,023"
            />
          </div>
          <div className="keen-slider__slide number-slide2">
            <PriceInNews 
              cryptoInitialsValue="BIT"
              price="R$23,62"
              changeValue="+7,082"
            />
            <PriceInNews 
              cryptoInitialsValue="DOG"
              price="R$23,62"
              changeValue="-5,230"
            />
            <PriceInNews 
              cryptoInitialsValue="ETH"
              price="R$23,62"
              changeValue="+1,023"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center">
        <div className="w-full md:w-[50%] flex justify-center md:justify-end">
          <div className="w-[272px] md:w-[20rem] xl:w-[36.875rem] flex flex-col items-center md:items-start mt-14 md:mt-[3.875rem] xl:mt-56">
            <h1 className="h5 text-center md:text-start md:h3 lg:h1 text-primary-500 font-bold">
              Lorem ipsum dolor sit amet, consectetur
            </h1>
            <h5 className="paragraph text-center md:text-start md:body xl:h5 text-text-base mt-2 mb-6 md:mt-6 md:mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
            </h5>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="btn-primary w-[180px] md:w-[232px] lg:w-[278px] h-[48px] label md:body md:font-bold py-2">
                  SIGN UP NOW
                  <ArrowRight className="text-white" size={18} weight="bold" />
                </button>
              </Dialog.Trigger>
              <ModalSignUp />
            </Dialog.Root>

            <div className="flex mt-6 md:mt-10 xl:mt-20 gap-4 md:gap-6 xl:gap-8">
              <Tag nameTag="Cryptos" />
              <Tag nameTag="NFTs" />
              <Tag nameTag="Games" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-[50%]">
          <div ref={sliderRef} className="keen-slider w-full overflow-hidden flex mt-[3.875rem] xl:mt-[10.25rem]">
            <div className="keen-slider__slide">
              <Image className="w-auto h-auto" src="/carousel_1.png" width={500} height={500} alt='carousel 1' />
            </div>
            <div className="keen-slider__slide">
              <Image className="w-auto h-auto" src="/carousel_2.png" width={500} height={500} alt='carousel 2' />
            </div>
            <div className="keen-slider__slide">
              <Image className="w-auto h-auto" src="/carousel_3.png" width={500} height={500} alt='carousel 3' />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:mt-14">
        <Image className="w-full h-full" src="/wave_primary.png" width={1440} height={247} alt='wave primary' />
      </div>

      <div className="w-full flex flex-col items-center py-14 md:py-20 xl:pt-[7.5rem] xl:pb-[8.125rem] bg-gradient-to-b from-white to-secondary-100">
        <div className="w-[272px] md:w-[42rem] xl:w-[76rem] flex items-center flex-col-reverse xl:flex-row">
          <div className="w-[272px] md:w-[43.75rem] flex overflow-hidden md:overflow-auto md:flex-col">
            <div className="hidden md:flex gap-8">
              <CardInfo 
               urlImage="/coin_icon.png"
               titleInfo="For your company"
               title="Crypto Solutions"
               description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
              />
              <CardInfo 
               urlImage="/flow_icon.png"
               titleInfo="For your company"
               title="Crypto Solutions"
               description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
              />
            </div>
            <div className="hidden md:flex justify-end items-end mt-8 gap-8">
              <CardInfo 
               urlImage="/business_icon.png"
               titleInfo="For your company"
               title="Crypto Solutions"
               description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
              />
              <CardInfo 
               urlImage="/laptop_icon.png"
               titleInfo="For your company"
               title="Crypto Solutions"
               description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
              />
            </div>

            <div className="w-[272px] flex md:hidden">
              <div ref={sliderCardsRef} className="keen-slider ml-5">
                <div className="keen-slider__slide">
                  <CardInfo 
                    urlImage="/coin_icon.png"
                    titleInfo="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
                  />
                </div>
                
                <div className="keen-slider__slide">
                  <CardInfo 
                    urlImage="/flow_icon.png"
                    titleInfo="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
                  />
                </div>
                
                <div className="keen-slider__slide">
                  <CardInfo 
                    urlImage="/business_icon.png"
                    titleInfo="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
                  />
                </div>
                
                <div className="keen-slider__slide">
                  <CardInfo 
                    urlImage="/laptop_icon.png"
                    titleInfo="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[268px] md:w-[30.875rem] xl:w-[25rem] flex flex-col justify-center ml-8">
            <h5 className="body xl:h5 text-primary-500 font-bold">
              Lorem ipsum
            </h5>
            <h2 className="h3 xl:h2 text-text-base font-bold mt-1 mb-4">
              Lorem ipsum
            </h2>
            <p className="text-text-base mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
            </p>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="hidden xl:flex btn-primary w-[176px] h-[48px] body py-[0.875rem] px-6">
                  Sign up now
                </button>
              </Dialog.Trigger>
              <ModalSignUp />
            </Dialog.Root>
          </div>
        </div>
      </div>

      <div className="w-[272px] md:w-[42rem] xl:w-[76rem] flex flex-col items-center">
        <h3 className="h5 md:h4 xl:h3 text-text-base font-bold mt-14 mb-4 md:mt-20 md:mb-10 xl:mt-[7.5rem] xl:mb-12">
          Top Cryptos
        </h3>

        <table className="table-auto w-full hidden md:table">
          <caption className="caption-bottom mt-8">
            <button onClick={() => setShowAllCryptos(!showAllCryptos)} className="text-primary-500 flex items-center body hover:text-primary-400">
              {
                showAllCryptos
                ?
                  <span>View less</span>
                :
                <>
                  <span>View more</span>
                  <Plus className="text-primary-500 hover:text-primary-400 ml-2" size={16} weight="bold" />
                </>
              }
            </button>
          </caption>
          <thead>
            <tr>
              <th className="text-end pr-1 label text-secondary-500">#</th>
              <th className="flex text-start ml-10 xl:ml-[7.5rem] label text-secondary-500">Crypto</th>
              <th className="text-start label text-secondary-500">Price</th>
              <th className="text-start label text-secondary-500">Change</th>
              <th className="text-center label text-secondary-500">Trade</th>
            </tr>
          </thead>
          <tbody>
            {
              quotes.length > 0 &&
              quotes.map((quote, index) => 
                {
                  let urlAsset = assets.find(asset => asset.asset_id === getAssetID(quote.symbol_id))
                  return (
                    (index+1) <= 4 
                      ?
                        <TrBodyCrypto 
                          key={quote.ask_price + (index+1)}
                          indiceValue={(index+1).toString().padStart(2, '0')}
                          urlImage={urlAsset ? urlAsset.url : "/bitcoin_icon.png"}
                          cryptoValue={getAssetName(quote.symbol_id)}
                          cryptoInitialsValue={getAssetID(quote.symbol_id)}
                          priceValue={`US$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(quote.ask_price * quote.ask_size)}`}
                          changeValue="+5,65%"
                          actionBuy={() => {}}
                        />
                      : showAllCryptos &&
                        <TrBodyCrypto 
                          key={quote.ask_price + (index+1)}
                          indiceValue={(index+1).toString().padStart(2, '0')}
                          urlImage={urlAsset ? urlAsset.url : "/bitcoin_icon.png"}
                          cryptoValue={getAssetName(quote.symbol_id)}
                          cryptoInitialsValue={getAssetID(quote.symbol_id)}
                          priceValue={`US$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(quote.ask_price * quote.ask_size)}`}
                          changeValue="+5,65%"
                          actionBuy={() => {}}
                        />
                  )
                }
              )
            }
          </tbody>
        </table>

        <div className="table border-separate table-auto w-full md:hidden">
          <div className="table-header-group align-middle border border-inherit">
            <div className="table-row align-baseline border border-inherit">
              <div className="align-baseline w-full flex justify-between items-center px-4 text-secondary-500">
                <h6 className="small-label">
                  Crypto
                </h6>
                <h6 className="small-label">
                  Trade
                </h6>
              </div>
            </div>
          </div>
          <div className="table-row-group align-middle border border-inherit">
            <TrBodyCryptoForMobile 
              urlImage="/bitcoin_icon.png"
              cryptoValue="Bitcoin"
              cryptoInitialsValue="BTC"
              priceValue="US$ 25.499,52"
              changeValue="+5,65%"
            />
            <TrBodyCryptoForMobile 
              urlImage="/ethereum_icon.png"
              cryptoValue="Ethereum"
              cryptoInitialsValue="ETH"
              priceValue="US$ 15.499,52"
              changeValue="-5,65%"
            />
            <TrBodyCryptoForMobile 
              urlImage="/cardano_icon.png"
              cryptoValue="Cardano"
              cryptoInitialsValue="ADA"
              priceValue="US$ 5.499,52"
              changeValue="-5,65%"
            />
            <TrBodyCryptoForMobile 
              urlImage="/solana_icon.png"
              cryptoValue="Solana"
              cryptoInitialsValue="SOL"
              priceValue="US$ 2.499,52"
              changeValue="+5,65%"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button className="text-primary-500 flex items-center body hover:text-primary-400">
              View more
              <Plus className="text-primary-500 hover:text-primary-400 ml-2" size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full relative flex flex-col md:flex-row items-center justify-evenly py-14 mt-14 md:py-20 md:mt-20 xl:py-[7.5rem] xl:mt-[7.5rem] overflow-hidden bg-gradient-to-r from-primary-500 to-primary-800">
        <Image className="w-full absolute left-0 z-0" src="/wave_footer.png" width={1440} height={412} alt='wave footer' />
        
        <div className="w-[272px] xl:w-[385px] flex flex-col">
          <h4 className="body md:h5 xl:h4 text-primary-200 z-0">
            Lorem ipsum
          </h4>
          <h2 className="h4 md:h3 xl:h2 text-white font-bold z-0">
            Lorem ipsum
          </h2>
          <p className="paragraph md:body text-white z-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
          </p>
        </div>
        <form className="flex flex-col mt-10 md:m-0">
          <label htmlFor="email" className="text-white mb-2 z-0">
            Email
          </label>
          <input 
            id="email"
            name="emailSubscribe"
            className="w-[272px] xl:w-[384px] h-[48px] p-4 text-secondary-400 body rounded-md focus:outline-none mb-5 z-0 disabled:text-secondary-300 disabled:cursor-not-allowed"
            type="email"
            placeholder="Email"
            value={emailSubscribe}
            onChange={(e) => setEmailSubscribe(e.target.value)}
            disabled={loadingSubscribe}
          />
          <button 
            type="button"
            onClick={handleSubscribe}
            className="btn-primary w-[272px] xl:w-[384px] h-[48px] body py-3 z-0 disabled:bg-primary-500/40 disabled:cursor-not-allowed" 
            disabled={loadingSubscribe}
          >
            {
              loadingSubscribe
              ?
              <>
                <Image className="animate-spin mr-2" src="/spinner_loading.png" width={20} height={20} alt='spinner loading' />
                <span>Loading ...</span>
              </>
              :
              <span>Subscribe</span>
            }
          </button>
        </form>
      </div>

      <footer className="w-[272px] md:w-[42rem] xl:w-[76rem] flex justify-center md:justify-between items-center p-6">
        <span className="hidden md:flex label text-text-base">
          Copyright © 2022 - All rights reserved
        </span>
        <Image src="/logo.png" width={95} height={16} alt='coin synch logo' />
      </footer>

    </main>
  )
}
