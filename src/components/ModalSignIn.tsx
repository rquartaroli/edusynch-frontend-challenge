import { ChangeEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from "next/image";
import { z } from 'zod';
import * as Dialog from '@radix-ui/react-dialog'
import { EnvelopeSimple, LockKey, X } from "@phosphor-icons/react"
import { InputDynamicForModal } from './InputDynamicForModal'
import { ModalSignUp } from "./ModalSignUp"
import { fakeApi } from "@/services/api";
import { UsersDTO } from "@/DTOs/fakeApiDTOs";
import { compare } from "bcryptjs";
import { useDispatch } from "react-redux";
import { add } from "@/redux/store";

const schemaFormValidate = z.object({
  email: z.string().email('Email invalid!'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
}).required({
  email: true,
  password: true,
});

type SchemaForm = z.infer<typeof schemaFormValidate>;

type ModalSignInProps = {
  comingFromSignUp?: boolean
}

export function ModalSignIn({ comingFromSignUp }: ModalSignInProps) {
  const [formData, setFormData] = useState<SchemaForm>({
    email: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState<Record<keyof SchemaForm, string>>({
    email: '',
    password: ''
  })
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const dispatch = useDispatch()

  const router = useRouter()

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
      setFormErrors({email: '', password: ''})

      const users = (await fakeApi.get('/users')).data as UsersDTO[]

      const userFound = users.find((user) => user.email === formData.email)

      if(userFound) {
        const doesPasswordMatches = await compare(formData.password, userFound.password)
        if(doesPasswordMatches) {
          localStorage.setItem('@edusynch-challenge-rafaelq/userId', JSON.stringify(userFound.id))
          dispatch(add({
            userFound,
          }))
          router.push('/dashboard')
          return
        }
      } 
      alert('Email or password incorrect!')
      setLoadingSubmit(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<keyof SchemaForm, string> = {
          email: "",
          password: ""
        };
        error.errors.forEach((err) => {
          if (err.path) {
            const fieldName = err.path[0] as keyof SchemaForm
            fieldErrors[fieldName] = err.message
          }
        });
        setFormErrors(fieldErrors)
        setLoadingSubmit(false)
      }
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-text-base/90 inset-0 fixed" />
      <Dialog.Content className="fixed bg-white p-4 md:p-6 xl:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[272px] md:w-80 xl:w-[448px]">
        <Dialog.Title className="body md:h5 xl:h4 text-text-base flex justify-center">
            Sign in to&nbsp;
          <span className="body md:h5 xl:h4 text-primary-500 font-bold">
            <span className="font-bold">Coin</span>
          </span>
          <span className="body md:h5 xl:h4 text-secondary-500">
            <span className="font-bold">Synch</span>
          </span>
        </Dialog.Title>
        <fieldset className="flex flex-col gap-6 items-center mt-6 mb-2">
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
        </fieldset>
        
        <fieldset className="flex flex-col items-center">
          <div className="flex justify-end items-center w-60 md:w-[272px] xl:w-[384px]">
            <Link href="https://www.google.com.br/" target="_blank" className="small-label text-secondary-500 hover:text-zinc-400">
              Forgot password?
            </Link>
          </div>

          <button 
            type="button"
            onClick={handleSubmit} 
            className="btn-primary w-60 md:w-[272px] xl:w-[384px] h-[48px] body py-3 my-4 xl:my-6 disabled:bg-primary-700 disabled:cursor-not-allowed"
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
              <span>Sign in</span>
            }
          </button>

          <h6 className="small-label xl:label text-text-base flex justify-center">
            <span className="hidden md:flex">Don’t have an account?&nbsp;</span>
            {comingFromSignUp
            ?
              <Dialog.Close asChild aria-label="Close">
                <Link href="" className="flex label text-text-base hover:text-zinc-400">
                  <h6 className="small-label xl:label text-text-base">
                    <span className="font-bold">Sign up to&nbsp;</span>
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
                      <span className="font-bold">Sign up to&nbsp;</span>
                    </h6>
                    <h6 className="small-label xl:label text-primary-500">
                      <span className="font-bold">Coin</span>
                    </h6>
                    <h6 className="small-label xl:label text-secondary-500">
                      <span className="font-bold">Synch</span>
                    </h6>
                  </Link>
                </Dialog.Trigger>
                <ModalSignUp comingFromSignIn={true} />
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