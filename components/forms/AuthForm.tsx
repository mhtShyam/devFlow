"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form"
import { object, z, ZodType } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ROUTES from "@/constants/routes"

interface AuthFormProps<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{success:boolean}>;
    formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
        schema,
        defaultValues,
        formType,
        onSubmit,
      }: AuthFormProps<T>) => {
 
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit : SubmitHandler<T>=async()=>{
    // TODO:authenticat user
    console.log(onSubmit)
  }

  const buttonText = formType == "SIGN_IN" ? "Sign In" :"Sign Up"
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
        {Object.keys(defaultValues).map((field)=>(
           <FormField
           key={field}
           control={form.control}
           name={field as Path<T>}
           render={({ field }) => (
             <FormItem className="flex flex-col gap-2.5 w-full">
               <FormLabel className="paragraph-medium text-dark400_light700">{field.name == "email" ? "Email Address": field.name.charAt(0).toUpperCase() + field.name.slice(1)}</FormLabel>
               <FormControl>
                 <Input required {...field} type={field.name =="password" ? "password" :"text"} className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border" />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        ))}
       
        <Button disabled={form.formState.isSubmitted} className="primary-gradient paragraph-medium min-h-12 w-full px-4 py-3 font-inter text-light-900">{form.formState.isSubmitting ? buttonText == "Sign In" ? "Sign In...":"Sign Up...": buttonText}</Button>
        {formType == "SIGN_IN" ? <p>Don't have an account?{" "}<Link className="paragraph-semibold primary-text-gradient" href={ROUTES.SIGN_UP}>Sign up</Link></p>:<p>Already have an account?{" "}<Link className="paragraph-semibold primary-text-gradient" href={ROUTES.SIGN_IN}>Sign in</Link></p>}
      </form>
    </Form>
  )
}

export default AuthForm;