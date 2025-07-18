'use client'
import React,{useEffect} from 'react'
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {formUrlQuery, removeKeysFormUrlQuery} from "@/lib/url";


interface Props {
    route: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

const LocalSearch = ({route, imgSrc, placeholder, otherClasses}:Props) => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [searchQuery, setSearchQuery] = React.useState(query || "");

    useEffect(() => {
        const delayDebounceFn= setTimeout(()=>{
            if(searchQuery){
                const newUrl = formUrlQuery({
                    params:searchParams.toString(),
                    key:"query",
                    value:searchQuery
                })
                router.push(newUrl,{scroll:false})
            }else {
                if(pathName === route){
                    const newUrl = removeKeysFormUrlQuery({
                        params:searchParams.toString(),
                        keysToRemove:["query"]
                    })
                    router.push(newUrl,{scroll:false})
                }
            }
        },500)

            return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, route, searchParams, pathName]);
    return (
        <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}` }>
            <Image src={imgSrc} alt='Search' height={24} width={24} className="cursor-pointer"/>
            <Input type="text" placeholder={placeholder} value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"/>
        </div>
    )
}
export default LocalSearch
