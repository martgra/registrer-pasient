import React from 'react';

interface KeypadProps {
  onKeyPress: (digit: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

const digits = ['1','2','3','4','5','6','7','8','9','0'];

export default function Keypad({ onKeyPress, onDelete, onConfirm }: KeypadProps) {
  return (
    <div className="flex flex-wrap w-72 justify-center gap-2">
      <div className="flex flex-wrap gap-2 justify-center w-full">
        {digits.map((digit) => (
          <button
            key={digit}
            data-testid={`digit-${digit}`}
            onClick={() => onKeyPress(digit)}
            type="button"
            className="
              w-20 h-20 
              bg-gray-200 dark:bg-gray-700 
              rounded text-2xl font-bold 
              flex items-center justify-center 
              hover:bg-gray-300 dark:hover:bg-gray-600 
              active:bg-gray-400 dark:active:bg-gray-500 
              text-gray-900 dark:text-white
            "
          >
            {digit}
          </button>
        ))}
      </div>
      <div className="flex w-full gap-2 justify-center mt-2">
        <button
          data-testid="delete-button"
          className="
            w-32 h-20 
            bg-yellow-200 dark:bg-yellow-600 
            rounded text-xl font-bold 
            flex items-center justify-center 
            hover:bg-yellow-300 dark:hover:bg-yellow-500 
            active:bg-yellow-400 dark:active:bg-yellow-400 
            text-gray-900 dark:text-white
          "
          onClick={onDelete}
          type="button"
        >
          Delete
        </button>
        <button
          data-testid="confirm-button"
          className="
            w-32 h-20 
            bg-green-200 dark:bg-green-600 
            rounded text-xl font-bold 
            flex items-center justify-center 
            hover:bg-green-300 dark:hover:bg-green-500 
            active:bg-green-400 dark:active:bg-green-400 
            text-gray-900 dark:text-white
          "
          onClick={onConfirm}
          type="button"
        >
          OK
        </button>
      </div>
    </div>
  );
}
