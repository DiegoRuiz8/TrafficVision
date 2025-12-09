// src/components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="rounded-lg bg-white shadow-lg p-4 dark:border-strokedark dark:bg-boxdark">{children}</div>
);

export const CardHeader: React.FC<CardProps> = ({ children }) => (
  <div className="border-b border-gray-200 p-4">{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const CardContent: React.FC<CardProps> = ({ children }) => (
  <div className="p-4">{children}</div>
);
