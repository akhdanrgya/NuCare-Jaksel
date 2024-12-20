import snap from './midtrans';

const createTransaction = async (params: any, callback: Function) => {
  try {
    const transaction = await snap.createTransaction(params); // Await the transaction creation
    const result = {
      token: transaction.token,
      redirect_url: transaction.redirect_url, // Ensure correct key
    };
    callback(result); // Pass the result to the callback
  } catch (error) {
    console.error('Error creating transaction:', error);
    callback(null, error); // Return error to callback if transaction creation fails
  }
};

export default createTransaction;
