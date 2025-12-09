import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-lg flex flex-col justify-between h-full w-full dark:border-strokedark dark:bg-boxdark ">
      <div className="flex justify-between">
        <div>
          <h4 className="text-2xl font-bold text-gray-800">{total}</h4>
          <span className="text-sm font-semibold text-gray-600">
            {title.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
          {children}
        </div>
      </div>

      <div className="mt-2">
        <span
          className={`text-sm font-medium flex items-center gap-1 ${
            levelUp
              ? 'text-green-500'
              : levelDown
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
        >
          {rate}
          {levelUp && (
            <svg
              className="w-3 h-3 fill-green-500"
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 0L9.5 5H0.5L5 0Z" />
            </svg>
          )}
          {levelDown && (
            <svg
              className="w-3 h-3 fill-red-500"
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 10L0.5 5H9.5L5 10Z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
