'use client'
import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SheetClose } from '@/components/ui/sheet'

const NavLinks = ({ userId, isMobileNav=false}:{userId?:string, isMobileNav?:boolean}) => {
    const pathname = usePathname()

  return <>{sidebarLinks.map((item)=>{
    const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

    if(item.route ==="/profile"){
        if(userId) item.route = `${item.route}/${userId}`;
        else return null;
    }

    const linkComponent = (<Link href={item.route} key={item.label} className={cn(isActive ? "primary-gradient rounded-lg text-light-900" :"text-dark300_light900", "flex items-center justify-start gap-4 p-4 bg-transparent")}>
        <Image src={item.imgURL} alt={item.label} width={20} height={20} className={cn({"inverted-colors":!isActive})}/>
        <p className={cn(isActive ? "base-bold":"base-medium", !isMobileNav && "max-lg:hidden")}>{item.label}</p>
        </Link>);

        return isMobileNav ? (<SheetClose key={item.route} asChild>{linkComponent}</SheetClose>) :<React.Fragment key={item.route}>{linkComponent}</React.Fragment>;
  })}</>
}

export default NavLinks
