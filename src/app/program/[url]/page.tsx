'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchUrl } from '../../../../data/donations'
import { DonasiType } from '../../../../data/donations'

const DonasiDetail = () => {
  const { url } = useParams() // Ambil URL parameter dari params
  const [donation, setDonation] = useState<DonasiType | null>(null) // State untuk menyimpan data donasi
  const [loading, setLoading] = useState(true) // State untuk loading
  const [error, setError] = useState<string | null>(null) // State untuk error

  useEffect(() => {
    const getDonation = async () => {
      if (url && typeof url === 'string') { // Pastikan url adalah string
        const donationData = await fetchUrl(url)
        if (donationData) {
          setDonation(donationData)
        } else {
          setError('Donasi tidak ditemukan')
        }
      }
      setLoading(false)
    }

    getDonation()
  }, [url]) // Menjalankan useEffect saat `url` berubah

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Detail untuk {donation?.tittle}</h1>
      <p>{donation?.description}</p>
      <p>Lokasi: {donation?.location}</p>
      <p>Jumlah yang terkumpul: {donation?.collected}</p>
      <p>Sisa hari: {donation?.daysLeft}</p>
      <img src={donation?.image} alt={donation?.tittle} />
    </div>
  )
}

export default DonasiDetail
