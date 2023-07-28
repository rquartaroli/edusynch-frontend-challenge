import { EnvelopeSimple, LockKey, X } from "@phosphor-icons/react"
import * as Dialog from '@radix-ui/react-dialog'
import { InputDynamicForModal } from './InputDynamicForModal'
import Link from "next/link"

export function ModalSignIn() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-text-base/90 inset-0 fixed" />
      <Dialog.Content className="fixed bg-white p-4 md:p-6 xl:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[272px] md:w-80 xl:w-[448px]">
        <Dialog.Title className="body md:h5 xl:h4 text-text-base flex justify-center">
            Sign in to&nbsp;
          <h4 className="body md:h5 xl:h4 text-primary-500">
            <span className="font-bold">Coin</span>
          </h4>
          <h4 className="body md:h5 xl:h4 text-secondary-500">
            <span className="font-bold">Synch</span>
          </h4>
        </Dialog.Title>
        <fieldset className="flex flex-col gap-6 items-center mt-6 mb-2">
          <InputDynamicForModal 
            id="emailModal"
            phosphorIcon={<EnvelopeSimple className="text-secondary-300 mr-2" size={18} weight="regular" />}
            type="email"
            placeholder="Email"
          />
          <InputDynamicForModal 
            id="passwordModal"
            phosphorIcon={<LockKey className="text-secondary-300 mr-2" size={18} weight="regular" />}
            isInputPassword={true}
            placeholder="Password"
          />
        </fieldset>
        
        <fieldset className="flex flex-col items-center">
          <div className="flex justify-end items-center w-60 md:w-[272px] xl:w-[384px]">
            <a href="" className="small-label text-secondary-500 hover:text-zinc-400">
              Forgot password?
            </a>
          </div>

          <Dialog.Close asChild aria-label="Close">
            <Link href="/dashboard" className="btn-primary w-60 md:w-[272px] xl:w-[384px] h-[48px] body py-3 my-4 xl:my-6">
              Sign in
            </Link>
          </Dialog.Close>

          <h6 className="small-label xl:label text-text-base flex justify-center">
              <span className="hidden md:flex">Don’t have an account?&nbsp;</span>
            <h6 className="small-label xl:label text-text-base font-bold">
              Sign up to&nbsp;
            </h6>
            <h6 className="small-label xl:label text-primary-500 font-bold">
              Coin
            </h6>
            <h6 className="small-label xl:label text-secondary-500 font-bold">
              Synch
            </h6>
          </h6>
        </fieldset>
        
        <Dialog.Close asChild aria-label="Close">
          <button className="w-6 h-6 inline-flex items-center justify-center rounded-full absolute top-4 right-4" aria-label="Close">
            <X className="text-secondary-500 hover:text-zinc-400" size={16} weight="bold" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}