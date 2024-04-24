export interface IResponse<T> {
    time: string;
    code: number;
    path: string;
    status: string | number;
    message: string;
    data: T;
}