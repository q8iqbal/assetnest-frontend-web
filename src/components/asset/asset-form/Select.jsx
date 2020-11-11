import React from 'react';
import "../asset-add/AssetForm.css";
import { Form, Row } from 'react-bootstrap';

function Select(props) {
  const { label, name, errorMessage, options, ...rest } = props;
    return (
        <Form.Group as={Row} controlId={name} className="AssetForm_form-group">
            <Form.Label column sm={4}>{label}</Form.Label>
            <Form.Control
                as="select"
                className="col-sm-8"
                name={name}
                isInvalid={!!errorMessage}
                {...rest}
            >
                {options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })}
            </ Form.Control>
            <Form.Control.Feedback type="invalid" tooltip>
                {errorMessage}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default Select;