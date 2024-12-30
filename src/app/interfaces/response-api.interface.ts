export interface ResponseApi<T> {
    success: boolean;
    message: string;
    data: Array<T>; 
}
