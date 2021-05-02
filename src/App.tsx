import React, { useEffect, useState } from 'react';
import Canvas from './Canvas';

import { makeStyles } from '@material-ui/core/styles';

import Toolbar from './Components/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden'
  }
}));

function App() {
  const classes = useStyles();
  const [activeTool, setActiveTool] = useState('PENCIL');
  return (
    <div className={classes.root} >
      <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />

      <Canvas activeTool={activeTool} />
    </div>
  );
}

export default App;
