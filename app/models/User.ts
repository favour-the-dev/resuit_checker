import mongoose, {Schema} from "mongoose";

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    level:{
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
})

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;