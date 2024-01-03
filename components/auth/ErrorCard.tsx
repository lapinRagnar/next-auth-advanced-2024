import { CardWrapper } from '@/components/auth/CardWrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'


export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Ooops, quelque chose ne va pas...'
      backButtonLabel='Retour a la page de connexion'
      backButtonHref='/auth/login'
    > 
      <div className=' w-full flex justify-center items-center '>
        <ExclamationTriangleIcon className='h-8 w-8 text-destructive'  />
      </div>
    </CardWrapper>
  )
}