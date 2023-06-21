import { getData } from "../utils/api";
import { IPayment } from "./types/payment-types";

export function getPaymentByTransfer(guid?: string): Promise<IPayment> {
    return getData(`/payment/transfer/${guid}`)
  }