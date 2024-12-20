import { NextRequest, NextResponse } from 'next/server';
import createTransaction from '../../../../libs/transaction';

export async function POST(req: NextRequest) {
  const params = {
    transaction_details: {
      order_id: 'test1',
      gross_amount: 50000,
    },
    customer_details: {
      first_name: 'adan',
      email: 'adan@gmail.com',
      phone: '082312730909',
    },
  };

  return new Promise((resolve) => {
    createTransaction(params, (transaction: { token: string; redirect_url: string }, error: any) => {
      if (error) {
        const errorDetails = {
          message: error.message || 'Unknown error',
          code: error.code || 'Unknown code',
        };

        resolve(
          NextResponse.json({ error: 'Transaction creation failed', details: errorDetails }, { status: 500 })
        );
      } else {
        resolve(
          NextResponse.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
          })
        );
      }
    });
  });
}
