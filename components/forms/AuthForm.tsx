"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form"
import { z, ZodType } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ROUTES from "@/constants/routes"
import { ActionResponse } from "@/types/global";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<ActionResponse>;
    formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
        schema,
        defaultValues,
        formType,
        onSubmit,
      }: AuthFormProps<T>) => {
 
  const router = useRouter();      
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit : SubmitHandler<T>=async(data)=>{
    const result = (await onSubmit(data)) as ActionResponse;
    if(result?.success){
      toast("Success", {
        description: formType == "SIGN_IN" ? "Signed in successfully" : "Signed up successfully",
      
      });
      router.push(ROUTES.HOME)
    }else {
      toast(`Error ${result?.status}`,{
        description: result?.errors?.message || "An error occurred",
      })
    }
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
        {formType == "SIGN_IN" ? <p>Don`&lsquo;t have an account?{" "}<Link className="paragraph-semibold primary-text-gradient" href={ROUTES.SIGN_UP}>Sign up</Link></p>:<p>Already have an account?{" "}<Link className="paragraph-semibold primary-text-gradient" href={ROUTES.SIGN_IN}>Sign in</Link></p>}
      </form>
    </Form>
  )
}

export default AuthForm;