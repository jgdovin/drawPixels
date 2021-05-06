import React, { useState } from 'react';
import Canvas from './Canvas';

import Toolbar from './Components/Toolbar';

function App() {
  const [activeTool, setActiveTool] = useState('PENCIL');
  return (
    <div>
      <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
      <Canvas activeTool={activeTool} />
    </div>
  );
}

export default App;
