'use client'
import { useParams } from 'next/navigation'

const DonasiDetail = () => {
  const { tittle } = useParams()
  
  return (
    <div>
      <h1>Detail untuk {tittle}</h1>
    </div>
  )
}

export default DonasiDetail
