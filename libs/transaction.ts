import snap from "./midtrans";

const createTransaction = async (params: any, callback: Function) => {
    snap
        .createTransaction(params)
        .then((transaction: {token: string; redirect_Url: string}) => {
            callback(transaction)
        })
}

export default createTransaction;