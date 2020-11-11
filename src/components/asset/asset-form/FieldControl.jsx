import React from 'react';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';

function FieldControl(props) {
    const {control, ...rest} = props;

    switch (control) {
        case 'input':
            return <Input {...rest} />;
        case 'select':
            return <Select {...rest} />;
        case 'textarea':
            return <TextArea {...rest} />;
        default:
            return null;
    }
}

export default FieldControl;