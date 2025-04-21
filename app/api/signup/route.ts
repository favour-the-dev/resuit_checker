import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongodb";
import Student from "@/app/models/User";
import bcrypt from "bcrypt";


export const POST = async(req: Request) => {
    try{
        const {firstName, lastName, email, password, level, studentId} = await req.json();
        await connectToMongoDb();
        const hashedPassword = await bcrypt.hash(password, 10);
        await Student.create({firstName, lastName, email, hashedPassword, level, studentId}); 
        return NextResponse.json({message: "student registered successfully", firstName, lastName, email, password, studentId}, {status: 200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "student registration failed"}, {status: 500});
    }
}