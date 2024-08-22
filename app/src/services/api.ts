import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create();

interface CustomErrorResponse {
  message: string;
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
  response?: AxiosResponse<CustomErrorResponse>;
}


export default instance;