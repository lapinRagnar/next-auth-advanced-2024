'use client'

import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'

import { newVerification } from '@/actions/new-verification'
import { CardWrapper } from "@/components/auth/CardWrapper"

import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

export const NewVerificationForm = () => {

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(async () => {

    if ( success || error ) return

    if (!token) {
      setError('Le token n\'existe pas')
      return
    }

    console.log('token', token)

    newVerification(token)
      .then((data: any) => {
        setSuccess(data?.success)
        setError(data?.error)
      }).catch((error) => {

        console.log('error', error)
        setError("Une erreur est survenue.")
      })


  }, [token, success, error])


  useEffect(() => {
    onSubmit()
  }, [onSubmit])


  return (
    <CardWrapper
      headerLabel="Confirmer votre email"
      backButtonLabel="Retour a la page de connexion"
      backButtonHref="/auth/login"      
    >
      <div className="flex flex-col items-center w-full justify-center gap-y-2">
        { !success && !error && (
          <BeatLoader />
        )}
        
        <FormSuccess message={success} />

        {!success && (
          <FormError message={error} />
        )}

      </div>

    </CardWrapper>
  )

}




