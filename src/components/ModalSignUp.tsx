import { User, EnvelopeSimple, LockKey, X, Check } from "@phosphor-icons/react"
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox';
import { InputWithIcon } from './InputWithIcon';

export function ModalSignUp() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-text-base/90 inset-0 fixed" />
      <Dialog.Content className="fixed bg-white p-4 md:px-6 md:py-8 xl:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[272px] md:w-80 xl:w-[480px]">
        <Dialog.Title className="body md:h5 xl:h4 text-text-base flex justify-center">
          Sign up to&nbsp;
          <h4 className="body md:h5 xl:h4 text-primary-500 font-bold">
            Coin
          </h4>
          <h4 className="body md:h5 xl:h4 text-secondary-500 font-bold">
            Synch
          </h4>
        </Dialog.Title>
        <fieldset className="flex flex-col gap-6 items-center mt-4 md:mt-6">
          <InputWithIcon 
            id="nameModal"
            phosphorIcon={<User className="text-secondary-300 mr-2" size={18} weight="regular" />}
            type="text"
            placeholder="Name"
          />
          <InputWithIcon 
            id="emailModal"
            phosphorIcon={<EnvelopeSimple className="text-secondary-300 mr-2" size={18} weight="regular" />}
            type="email"
            placeholder="Email"
          />
          <InputWithIcon 
            id="passwordModal"
            phosphorIcon={<LockKey className="text-secondary-300 mr-2" size={18} weight="regular" />}
            isInputPassword={true}
            placeholder="Password"
          />
          <InputWithIcon 
            id="confirmPasswordModal"
            phosphorIcon={<LockKey className="text-secondary-300 mr-2" size={18} weight="regular" />}
            isInputPassword={true}
            placeholder="Confirm Password"
          />
        </fieldset>
        
        <fieldset className="flex flex-col items-center">
          <div className="flex w-60 md:w-[272px] xl:w-[384px] mt-6">
            <Checkbox.Root className="w-6 xl:w-5 h-4 border border-primary-500 hover:bg-primary-100 bg-white rounded flex justify-center items-center mr-4" id="c1">
              <Checkbox.Indicator>
                <Check className="text-primary-500" size={10} weight="regular" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="small-label md:label text-text-base" htmlFor="c1">
              I have read and accept the&nbsp;
              <span className="font-bold">Privacy Policy</span> and&nbsp;
              <span className="font-bold">Terms of User Sign up.</span>
            </label>
          </div>

          <Dialog.Close asChild>
            <button className="btn-primary w-60 md:w-[272px] xl:w-[384px] h-[48px] body py-3 my-6">
              Sign up
            </button>
          </Dialog.Close>

          <h6 className="small-label xl:label text-text-base flex justify-center">
              <span className="hidden md:flex">Already have and account?&nbsp;</span>
            <h6 className="small-label xl:label text-text-base font-bold">
              Sign in to&nbsp;
            </h6>
            <h6 className="small-label xl:label text-primary-500 font-bold">
              Coin
            </h6>
            <h6 className="small-label xl:label text-secondary-500 font-bold">
              Synch
            </h6>
          </h6>
        </fieldset>
         
        <Dialog.Close asChild>
          <button className="w-6 h-6 inline-flex items-center justify-center rounded-full absolute top-4 right-4" aria-label="Close">
            <X className="text-secondary-500 hover:text-zinc-400" size={18} weight="bold" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}