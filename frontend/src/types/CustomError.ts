export default interface CustomError {
    data: {
        message: string,
        stack: string,
    },
    status: number
}