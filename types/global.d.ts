import { NextResponse } from "next/server";

interface Tag{
    _id: string;
    name: string;
}

interface Author{
    _id: string;
    name: string;
    image: string;
}

interface IQuestion{
    _id:string;
    title:string;
    content:string;
    tags:Tag[];
    author:Author;
    createdAt:Date;
    upvotes:number;
    answers:number;
    views:number;
}

type ActionResponse<T=null>={
    success:boolean;
    data?:T;
    errors?:{
        message:string;
        details:Record<string, string[]>
    },
    status?:number;
}

type SuccessResponse<T = null> = ActionResponse<T> & {success:true};
type ErrorResponse = ActionResponse<undefined> & {success:false};

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>

interface RouteParams {
    params: Record<string, string>;
    searchParams: Record<string, string>;
}