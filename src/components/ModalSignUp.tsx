import { ChangeEvent, useState } from 'react';
import { hash } from "bcryptjs"
import Link from "next/link"
import Image from 'next/image';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox';
import { User, EnvelopeSimple, LockKey, X, Check } from "@phosphor-icons/react"
import { InputDynamicForModal } from './InputDynamicForModal';
import { ModalSignIn } from "./ModalSignIn";
import { fakeApi } from '@/services/api';
import { WalletDTO, UsersDTO } from '@/DTOs/fakeApiDTOs';
import { generateRandomID } from '@/utils/generateRandomID';

const schemaFormValidate = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email('Email invalid!'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
  confirm_password: z.string().min(3, 'Confirm password must be matches the password'),
}).required({
  name: true,
  email: true,
  password: true,
  confirm_password: true,
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
});

type SchemaForm = z.infer<typeof schemaFormValidate>;

type ModalSignUpProps = {
  comingFromSignIn?: boolean
}

export function ModalSignUp({ comingFromSignIn = false }: ModalSignUpProps) {
  const [confirmTerms, setConfirmTerms] = useState<boolean | 'indeterminate'>(false)
  const [showInfoAboutConfirmTerms, setShowInfoAboutConfirmTerms] = useState(false)
  const [formData, setFormData] = useState<SchemaForm>({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const [formErrors, setFormErrors] = useState<Record<keyof SchemaForm, string>>({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoadingSubmit(true)
      schemaFormValidate.parse(formData)

      setFormErrors({
        name: '', 
        email: '', 
        password: '', 
        confirm_password: ''
      })

      if(!confirmTerms) {
        setLoadingSubmit(false)
        setShowInfoAboutConfirmTerms(true)
        return
      }
      setShowInfoAboutConfirmTerms(false)
      
      const users = (await fakeApi.get('/users')).data as UsersDTO[]

      const userFound = users.find((user) => user.email === formData.email)

      if(userFound) {
        alert('This email is already exists!')
        setLoadingSubmit(false)
        return
      } 
      
      const newUser = {
        id: generateRandomID(36),
        name: formData.name,
        email: formData.email,
        password: await hash(formData.password, 6),
        avatar: faker.image.avatarGitHub(),
        terms_accepted: confirmTerms,
      } as UsersDTO

      await fakeApi.post('/users', newUser)

      const walletFornewUser = {
        id: newUser.id,
        cryptos: [],
        balance: 0.00
      } as WalletDTO

      await fakeApi.post('/wallets', walletFornewUser)

      alert('User registered successfully')
      setFormData({
        name: '', 
        email: '', 
        password: '', 
        confirm_password: ''
      })
      setConfirmTerms(false)
      setLoadingSubmit(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<keyof SchemaForm, string> = {
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        };
        error.errors.forEach((err) => {
          if (err.path) {
            const fieldName = err.path[0] as keyof SchemaForm
            fieldErrors[fieldName] = err.message
          }
        });
        setFormErrors(fieldErrors)
        if(!confirmTerms) {
          setShowInfoAboutConfirmTerms(true)
        } else {
          setShowInfoAboutConfirmTerms(false)
        }
      } else {
        alert('Internal Server Error!')
      }
      setLoadingSubmit(false)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-text-base/90 inset-0 fixed" />
      <Dialog.Content className="fixed bg-white p-4 md:px-6 md:py-8 xl:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[272px] md:w-80 xl:w-[480px]">
        <Dialog.Title className="body md:h5 xl:h4 text-text-base flex justify-center">
            Sign up to&nbsp;
          <span className="body md:h5 xl:h4 text-primary-500">
            <span className="font-bold">Coin</span>
          </span>
          <span className="body md:h5 xl:h4 text-secondary-500">
            <span className="font-bold">Synch</span>
          </span>
        </Dialog.Title>
        <fieldset className="flex flex-col gap-6 items-center mt-4 md:mt-6">
          <InputDynamicForModal 
            id="nameModal"
            name="name"
            phosphorIcon={<User className="text-secondary-300 mr-2" size={18} weight="regular" />}
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loadingSubmit}
          />
          {formErrors?.name && <span className="small-label md:label text-quartenary-700 -mt-5">{formErrors.name}</span>}
          <InputDynamicForModal 
            id="emailModal"
            name="email"
            phosphorIcon={<EnvelopeSimple className="text-secondary-300 mr-2" size={18} weight="regular" />}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loadingSubmit}
          />
          {formErrors?.email && <span className="small-label md:label text-quartenary-700 -mt-5">{formErrors.email}</span>}
          <InputDynamicForModal 
            id="passwordModal"
            name="password"
            phosphorIcon={<LockKey className="text-secondary-300 mr-2" size={18} weight="regular" />}
            isInputPassword={true}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loadingSubmit}
          />
          {formErrors?.password && <span className="small-label md:label text-quartenary-700 -mt-5">{formErrors.password}</span>}
          <InputDynamicForModal 
            id="confirmPasswordModal"
            name="confirm_password"
            phosphorIcon={<LockKey className="text-secondary-300 mr-2" size={18} weight="regular" />}
            isInputPassword={true}
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            disabled={loadingSubmit}
          />
          {formErrors?.confirm_password && <span className="small-label md:label text-quartenary-700 -mt-5">{formErrors.confirm_password}</span>}
        </fieldset>
        
        <fieldset className="flex flex-col items-center">
          {showInfoAboutConfirmTerms && <span className="small-label md:label text-center text-quartenary-700 -mb-5 mt-6">
            Need to agree with Privacy Policy and Terms of User for Sign up.
          </span>
          }
          <div className="flex w-60 md:w-[272px] xl:w-[384px] mt-6">
          
            <Checkbox.Root 
              id="c1"
              checked={confirmTerms} 
              onCheckedChange={setConfirmTerms} 
              className="w-6 xl:w-5 h-4 border border-primary-500 hover:bg-primary-100 bg-white rounded flex justify-center items-center mr-4 disabled:cursor-not-allowed"
              disabled={loadingSubmit}
            >
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


          <button 
            type="button"
            onClick={handleSubmit} 
            className="btn-primary w-60 md:w-[272px] xl:w-[384px] h-[48px] body py-3 my-6 disabled:bg-primary-700 disabled:cursor-not-allowed"
            disabled={loadingSubmit}
          >
            {
              loadingSubmit
              ?
              <>
                <Image className="animate-spin mr-2" src="/spinner_loading.png" width={20} height={20} alt='spinner loading' />
                <span>Loading ...</span>
              </>
              :
              <span>Sign up</span>
            }
          </button>

          <h6 className="small-label xl:label text-text-base flex justify-center">
            <span className="hidden md:flex">Already have and account?&nbsp;</span>
            {comingFromSignIn
            ?
              <Dialog.Close asChild aria-label="Close">
                <Link href="" className="flex label text-text-base hover:text-zinc-400">
                  <h6 className="small-label xl:label text-text-base">
                    <span className="font-bold">Sign in to&nbsp;</span>
                  </h6>
                  <h6 className="small-label xl:label text-primary-500">
                    <span className="font-bold">Coin</span>
                  </h6>
                  <h6 className="small-label xl:label text-secondary-500">
                    <span className="font-bold">Synch</span>
                  </h6>
                </Link>
              </Dialog.Close>
            :
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Link href="" className="flex label text-text-base hover:text-zinc-400">
                    <h6 className="small-label xl:label text-text-base">
                      <span className="font-bold">Sign in to&nbsp;</span>
                    </h6>
                    <h6 className="small-label xl:label text-primary-500">
                      <span className="font-bold">Coin</span>
                    </h6>
                    <h6 className="small-label xl:label text-secondary-500">
                      <span className="font-bold">Synch</span>
                    </h6>
                  </Link>
                </Dialog.Trigger>
                <ModalSignIn comingFromSignUp={true} />
              </Dialog.Root>
            }
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