import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema} from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const account = Account.find();
        if(!account) throw new NotFoundError("Account");

        return NextResponse.json({success:true, data: account}, {status:200})
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}

export async function POST(request:Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = AccountSchema.parse(body);
        const existingAccount = await Account.findOne({
            provider: validatedData.provider,
            providerAccountId: validatedData.providerAccountId,
        })

        if(existingAccount) throw new ForbiddenError("Account already exists with same provider.");

        const newAccount = await Account.create(validatedData);

        return NextResponse.json({success:true, data: newAccount}, {status:201});
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}