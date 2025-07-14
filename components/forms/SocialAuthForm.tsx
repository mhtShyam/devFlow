'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import ROUTES from '@/constants/routes'

const SocialAuthForm = () => {
    const ButtonClass = "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5 cursor-pointer";

    const handleSignIn = async(provider:"github" |"google")=>{
        try {
            await signIn(provider,{
                redirectTo:ROUTES.HOME
            });
        } catch (error) {
            console.log(error, provider)
            toast("Sign-in Failed.",
                {
                description: error instanceof Error ? error.message : "An Error occured during sign-in",
            
            })
        }
    }
  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
        <Button className={ButtonClass} onClick={()=> handleSignIn("github")}>
            <Image src="/icons/github.svg" alt='GitHub Logo' className='invert-colors object-contain mr-2.5' width={20} height={20}/>
            <span>Log in with GitHub</span>
        </Button>
        <Button className={ButtonClass} onClick={()=>handleSignIn('google')}>
            <Image src="/icons/google.svg" alt='Google Logo' className='object-contain mr-2.5' width={20} height={20}/>
            <span>Log in with Google</span>
        </Button>
    </div>
  )
}

export default SocialAuthForm
