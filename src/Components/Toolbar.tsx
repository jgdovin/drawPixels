import React, { ReactElement } from 'react';
import Icon from '@mdi/react';
import Paper from '@material-ui/core/Paper';
import { mdiEraser, mdiPencil } from '@mdi/js';

import Grid from '@material-ui/core/Grid';
import './Toolbar.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    active: {
        width: '100px',
        height: '100px',
        border: '2px solid #ff0000'
    },
    container: {
        paddingTop: '30px',
        flexGrow: 1
    },
    toolButton: {
        width: '100px',
        height: '100px',
        boxSizing: 'border-box'
    },
    inactive: {
        backgroundColor: '#c4c4c4'
    }
}));

const Toolbar = (props: { activeTool: string; setActiveTool: React.Dispatch<React.SetStateAction<string>>; }): ReactElement => {
    const { activeTool, setActiveTool } = props;
    const classes = useStyles();

    const buttons = [
        {
            icon: mdiPencil,
            toolName: 'PENCIL'
        },
        {
            icon: mdiEraser,
            toolName: 'ERASER'
        }
    ];
    return (      
        <div className={classes.container} >
            <Grid item xs={2}>
                <Grid container justify="center" spacing={2}>
                {buttons.map((value, index) => (
                    <Grid key={index} item>
                        <Paper className={activeTool === buttons[index].toolName ? `${classes.toolButton} ${classes.active}` : `${classes.toolButton} ${classes.inactive}`} onClick={() => { setActiveTool(buttons[index].toolName) }}>
                            <Icon path={buttons[index].icon} />
                        </Paper>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default Toolbar;