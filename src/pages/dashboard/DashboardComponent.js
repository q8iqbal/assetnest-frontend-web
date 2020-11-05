import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
});

function DashboardComponent() {
    const classes = useStyles();
    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Total Assets'
                        value='1207'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Dekstops'
                        value='207'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Machines'
                        value='112'
                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Vehicles'
                        value='102'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Accessories'
                        value='707'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Documents'
                        value='31'
                    />
                </Row>
            </Row>
            
        </Column>
    );
}

export default DashboardComponent;
