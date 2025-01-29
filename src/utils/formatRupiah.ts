
export const formatRupiah = (amount: number) => {
  console.log(Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 5,  // Pastikan tidak ada desimal
    maximumFractionDigits: 5,  // Pastikan tidak ada desimal
  }).format(amount))
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 5,  // Pastikan tidak ada desimal
    maximumFractionDigits: 5,  // Pastikan tidak ada desimal
  }).format(amount)
}

export const formatRupiahWithoutRp = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  }).format(amount)
}
