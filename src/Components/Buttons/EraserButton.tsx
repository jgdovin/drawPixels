import Icon from '@mdi/react';
import { mdiEraser } from '@mdi/js';
import Paper from '@material-ui/core/Paper';
import './Buttons.css';

const EraserButton = (classes: any, setActiveTool: Function) => {
    return (
        <Paper className='toolButton' onClick={() => { setActiveTool('Eraser') }}>
            <Icon path={mdiEraser} />
        </Paper>
    );
};

export default EraserButton;