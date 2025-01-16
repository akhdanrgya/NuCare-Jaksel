"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { fetchUrl, DonasiType } from "../data/donations";
import { DonaturType, insertDonatur } from "../data/donatur";
import {updateCollected} from "../data/donations";
import { v4 as uuidv4 } from "uuid";

const PaymentDonation = () => {
  const { url } = useParams();
  const [donation, setDonation] = useState<DonasiType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hideName, setHideName] = useState(false);
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const getDonation = async () => {
      if (url && typeof url === "string") {
        const donationData = await fetchUrl(url);
        if (donationData) {
          setDonation(donationData);
        } else {
          setError("Donasi tidak ditemukan");
        }
      }
      setLoading(false);
    };

    getDonation();
  }, [url]);

  const handleSubmit = async (event: React.FormEvent) => {
    setDone(true);
    event.preventDefault();
    const orderId = uuidv4();

    const data = {
      order_id: orderId,
      gross_amount: parseInt(amount),
      first_name: name,
      email: email,
      phone: phoneNumber,
    };

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        window.open(
          result.redirect_url,
          "_blank",
          "width=600,height=400,resizable,scrollbars=yes"
        );
        console.log("Generated orderId: ", orderId)
        setOrderId(orderId);
        startPollingStatus(orderId);
      } else {
        console.error("Transaction failed", result.error);
      }
    } catch (error) {
      console.error("Error making the request", error);
    }
  };

  const startPollingStatus = (orderId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/status?orderId=${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
          if (data.transaction_status === "settlement") {
            clearInterval(interval);
            insert(orderId);
            updateCollected(donation?.id ?? 0, parseInt(amount))
          }
        } else {
          setError("Failed to fetch status");
        }
      } catch (err) {
        setError("Error fetching status");
      }
    }, 5000);
  };

  const insert = async (orderIdx: string) => {
    const donaturData: DonaturType = {
      id: 0,
      name: name,
      value: parseInt(amount),
      donationsId: donation?.id ?? 0,
      notelp: parseInt(phoneNumber),
      email: email,
      orderId: orderIdx,
    };

    try {
      const result = await insertDonatur(donaturData);
      console.log("Donatur berhasil disimpan:", result);
    } catch (error) {
      setError("Gagal menyimpan donatur");
      console.error(error);
    }
  };

  if (!done) {
    return (
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          {donation?.tittle}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-bold mb-2"
            >
              Jumlah Donasi:
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nama:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              Nomor Telpon:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hideName" className="inline-flex items-center">
              <input
                type="checkbox"
                id="hideName"
                checked={hideName}
                onChange={(e) => setHideName(e.target.checked)}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Sembunyikan Nama Saya</span>
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            >
              Pesan:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="terms" className="inline-flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">
                Saya setuju dengan syarat dan ketentuan yang berlaku
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Donate
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8">Terimakasih</h1>
      </div>
    );
  }
};

export default PaymentDonation;
