import axios  from "axios";
import { CourseResult , CourseResultData, specificResult, allResultData } from "../types/types";

const url = process.env.NEXT_PUBLIC_API_URL
const token = typeof window !== "undefined"
  ? localStorage.getItem("userToken")
  : null;

class ResultsService {
    static async uploadStudentResult(formData: CourseResult): Promise<CourseResult>{
        try {
            const res = await axios.post(`${url}/results/admin`, formData, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res?.data
            return data
        } catch (error) {
            console.log(error)
            throw Error
        }
    }

    static async getStudentResult({level, semester}: specificResult): Promise<CourseResultData[]> {
        try {
          const res = await axios.get(`${url}/results/student/my-results?level=${level}&semester=${semester}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });
          
          if (!res?.data?.data) {
            throw new Error('No result data found');
          }
          
          return res.data.data;
        } catch (error) {
          console.error('Failed to fetch student result:', error);
          throw error instanceof Error ? error : new Error('Failed to fetch student result');
        }
      }
      static async getAllResult(): Promise<allResultData[]> {
        try {
          const res = await axios.get(`${url}/results/admin`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });
          
          if (!res?.data?.data) {
            throw new Error('No result data found');
          }
          
          return res.data.data;
        } catch (error) {
          console.error('Failed to fetch student result:', error);
          throw error instanceof Error ? error : new Error('Failed to fetch student result');
        }
      }
}

export default ResultsService