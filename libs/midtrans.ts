import midtransClient from 'midtrans-client'

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || ''
})

export default snap