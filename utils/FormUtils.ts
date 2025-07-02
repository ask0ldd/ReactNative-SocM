import { ZodError } from "zod/v4";

export default class FormUtils{
    static parseFormError(error: unknown): string {
        if (error instanceof ZodError) {
            return JSON.parse(error.message)[0].message
        }
        return JSON.stringify(error);
    }
}