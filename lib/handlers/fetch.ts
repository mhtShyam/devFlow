import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";


interface FetchOptions extends RequestInit {
    timeout?: number;
   
} 

function isError(error: unknown): error is Error {
    return error instanceof Error;  

}

export async function fetchHandler<T>(url:string, options:FetchOptions={}):Promise<ActionResponse<T>>{
    const {timeout=5000, headers:customHeaders={}, ...restOptions} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders : HeadersInit = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    const headers : HeadersInit = {
        ...defaultHeaders,                      
        ...customHeaders,
    };

    const config: RequestInit = {
        ...restOptions,
        headers,
        signal: controller.signal,  
    };

    try {
        const response = await fetch(url, config);
        clearTimeout(id);

        if(!response.ok){
            throw new RequestError(response.status, `Http error: ${response.statusText}`);
        }

        return await response.json() as Promise<ActionResponse<T>>;
    } catch (err) {
        const error = isError(err) ? err : new Error("An unknown error occurred");

        if(error.name === "AbortError") {
           logger.warn(`Fetch request to ${url} timed out after ${timeout}ms`);
        }else{
            logger.error(`Fetch request to ${url} failed: ${error.message}`);
        }
        return handleError(error) as ActionResponse<T>;
    }
}
    