import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { techMap } from "@/constants/techMap"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getDeviconClassName=(techName:string)=>{
const normalizedTech =techName.replace(/[ .]/g,"").toLowerCase();
return `${techMap[normalizedTech] || "devicon-devicon-plain"} colored`;
}
