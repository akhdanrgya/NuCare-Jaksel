// src/app/api/status/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
  }

  try {
    const serverKey = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: 'Server key is missing' }, { status: 400 });
    }

    const response = await fetch(`https://api.midtrans.com/v2/${orderId}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${serverKey}:`)}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to fetch status' }, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching status', details: error.message }, { status: 500 });
  }
}
