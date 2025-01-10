"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FetchBeritaById, BeritaType } from "../data/bertita";

const BeritaDetails = () => {
  const { idx } = useParams();

  const [berita, setBerita] = useState<BeritaType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBerita = async () => {
      const id = Number(idx);
      if (!isNaN(id)) {
        try {
          const beritaData = await FetchBeritaById(id);
          if (beritaData) {
            setBerita(beritaData);
          } else {
            setError("Berita Tidak ditemukan");
          }
        } catch (err) {
          setError("Terjadi kesalahan saat mengambil data");
        }
      } else {
        setError("ID tidak valid");
      }
    };

    getBerita();
  }, [idx]);

  return (
    <div>
      {error && <p>{error}</p>}
      {berita ? (
        <div>
          <h1>{berita.judul}</h1>
          <p>{berita.kategori}</p>
          <p>{berita.created_at}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BeritaDetails;
