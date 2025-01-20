import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface CodeInputProps {
  onSubmit: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ onSubmit }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 4) {
      onSubmit(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={code}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 4) {
            setCode(value);
          }
        }}
        placeholder="Enter 4-digit code"
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={4}
        pattern="\d{4}"
      />
      <button
        type="submit"
        disabled={code.length !== 4}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};