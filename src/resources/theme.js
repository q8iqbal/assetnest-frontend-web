const color = {
    minorColor: '#ff7b4b', 
    green: '#78f184',
    white: '#fff',
    black: '#000' 
};

const typography = {
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px'
    },
    smallSubtitle: {
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.1px'
    },
    link: {
        fontWeight: '600',
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: color.lightBlue,
        textAlign: 'right',
        cursor: 'pointer',
        textDecoration: 'underline',
        '&:hover': {
            color: color.grayishBlue
        }
    },
    itemTitle: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0.2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3
    }
};

export default {
    // https://www.colorhexa.com/A4A6B3
    color,
    typography
};
