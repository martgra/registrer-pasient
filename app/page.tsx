"use client";

import React, { useState } from 'react';
import Keypad from '@/components/keypad';
import { idnr  } from '@navikt/fnrvalidator'


export default function Home() {
  const [personnummer, setPersonnummer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);



  const handleKeyPress = (digit: string) => {
    setError(null);
    setSuccess(false);
    if (personnummer.length < 11) {
      setPersonnummer(personnummer + digit);
    }
  };

  const handleDelete = () => {
    setPersonnummer(personnummer.slice(0, -1));
  };

  const handleConfirm = async () => {
    setError(null);
    setSuccess(false);

    if (idnr(personnummer).status == "invalid") {
      setError("Ugyldig personnummer.");
      return;
    }

    try {
      const res = await fetch('/api/registerArrival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personnummer })
      });

      if (!res.ok) {
        const data = await res.json() as { message?: string };
        throw new Error(data.message || 'Noe gikk galt ved innsjekking.');
      }

      setSuccess(true);
      setPersonnummer('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        // If it's not an instance of Error, provide a fallback message.
        setError('Noe gikk galt ved innsjekking.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Registrer Oppmøte</h1>
      <div className="mb-4">
        <input
          type="text"
          value={personnummer}
          readOnly
          placeholder="Skriv inn ditt personnummer"
          className="text-center border border-gray-300 dark:border-gray-700 rounded w-72 p-2 text-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      {error && <div className="text-red-600 dark:text-red-500 mb-2 font-semibold">{error}</div>}
      {success && <div className="text-green-600 dark:text-green-400 mb-2 font-semibold">Oppmøte registrert!</div>}

      <Keypad onKeyPress={handleKeyPress} onDelete={handleDelete} onConfirm={handleConfirm} />
    </div>
  );
}
