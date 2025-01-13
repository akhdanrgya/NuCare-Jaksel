import snap from './midtrans';

interface TransactionParams {
  [key: string]: any;
}

interface TransactionResult {
  token: string;
  redirect_url: string;
}

const createTransaction = async (
    params: TransactionParams,
    callback: (result: TransactionResult | null, error?: Error) => void
): Promise<void> => {
  try {
    const transaction = await snap.createTransaction(params);
    const result: TransactionResult = {
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    };
    callback(result);
  } catch (error) {
    console.error('Error creating transaction:', error);
    callback(null, error instanceof Error ? error : new Error(String(error)));
  }
};

export default createTransaction;
