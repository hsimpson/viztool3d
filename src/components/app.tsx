import React from 'react';
import { Gui } from './gui';
import { Viewer } from './viewer';

export const App = (): React.ReactElement => {
  return (
    <div className="bg-gray-600 h-screen flex flex-row">
      <Gui />
      <Viewer />
    </div>
  );
};
