import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import {Logo} from './assetnest-horizontal.svg';

const useStyles = createUseStyles((theme) => ({
    container: {
        marginLeft: 32,
        marginRight: 32
    },
    title: {
        ...theme.typography.cardTitle,
        color: theme.color.black,
        opacity: 0.7,
        marginLeft: 12
    }
}));

function LogoComponent() {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <Row className={classes.container} horizontal='center' vertical='center'>
            {/* <Logo /> */}
            <span className={classes.title}></span>
        </Row>
    );
}

export default LogoComponent;

