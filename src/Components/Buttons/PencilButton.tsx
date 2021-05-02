import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
import Paper from '@material-ui/core/Paper';
import './Buttons.css';

const PencilButton = (classes: any, setActiveTool: any) => {
    return (
        <Paper className='toolButton' onClick={() => { setActiveTool('Pencil') }}>
            <Icon path={mdiPencil} />
        </Paper>
    );
};

PencilButton.handleClick = () => {
    console.log('test1');
}

export default PencilButton;