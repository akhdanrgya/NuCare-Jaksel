import { NextRequest, NextResponse } from 'next/server';
import createTransaction from '../../../../libs/transaction';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const params = {
      transaction_details: {
        order_id: body.order_id || 'default_order_id',
        gross_amount: body.gross_amount || 0,
      },
      customer_details: {
        first_name: body.first_name || 'Anonymous',
        email: body.email || 'example@example.com',
        phone: body.phone || '0000000000',
      },
    };

    // Proses transaksi dengan createTransaction
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
  } catch (error : any) {
    return NextResponse.json({ error: 'Invalid request body', details: error.message }, { status: 400 });
  }
}
