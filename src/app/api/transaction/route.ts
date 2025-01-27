import { NextRequest, NextResponse } from 'next/server';
import createTransaction from '@/libs/transaction';

interface TransactionResult {
  token: string;
  redirect_url: string;
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();

    const params = {
      transaction_details: {
        order_id: body.order_id || `order_${Date.now()}`,
        gross_amount: body.gross_amount || 0,
      },
      customer_details: {
        first_name: body.first_name || 'Anonymous',
        email: body.email || 'example@example.com',
        phone: body.phone || '0000000000',
      },
      item_details: {
        id: body.id || 0,
        price: body.price || 0,
        quantity: 1,
        name: body.name || 'Anonymous',
        category: body.category || 'hehe',
      },
    };

    const transaction = await new Promise<TransactionResult>((resolve, reject) => {
      createTransaction(params, (transaction, error) => {
        if (error) {
          reject(error);
        } else if (transaction) {
          resolve(transaction);
        } else {
          reject(new Error('Transaction is null'));
        }
      });
    });

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error: any) {
    return NextResponse.json(
        { error: 'Transaction creation failed', details: error.message || 'Unknown error' },
        { status: 500 }
    );
  }
}
