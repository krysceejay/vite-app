import { getData } from "../utils/api";
import { IPaymentMethod } from "./types/payment-method-types";

export function getPaymentMethods(): Promise<IPaymentMethod[]> {
  return getData('/payment-method')
}