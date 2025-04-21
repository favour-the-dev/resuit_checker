import { connectToMongoDb } from "@/lib/mongodb"
import Student from "@/app/models/User";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        await connectToMongoDb();
        const { email } = await req.json();
        const student = await Student.findOne({email}).select("_id");
        console.log("Student found:", student);
        return NextResponse.json({student});
    } catch (error) {
        console.error("Error checking user existence:", error);
        return NextResponse.json({message: "Error checking user existence"}, {status: 500});
    }
}