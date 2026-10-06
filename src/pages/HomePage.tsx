import React from 'react';
import { World } from '../components/World';

export const HomePage: React.FC = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <World />
    </main>
  );
};
