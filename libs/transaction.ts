import snap from './midtrans';

const createTransaction = async (params: any, callback: Function) => {
  try {
    const transaction = await snap.createTransaction(params);
    const result = {
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    };
    callback(result);
  } catch (error) {
    console.error('Error creating transaction:', error);
    callback(null, error);
  }
};

export default createTransaction;
