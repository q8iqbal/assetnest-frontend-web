import React from 'react';
import "../asset-add/AssetForm.css";
import { Form, Row } from 'react-bootstrap';

function TextArea(props) {
  const { label, name, errorMessage, ...rest } = props;
    return (
        <Form.Group as={Row} controlId={name} className="AssetForm_form-group">
            <Form.Label column sm={4}>{label}</Form.Label>
            <Form.Control
                as="textarea"
                className="col-sm-8"
                name={name}
                isInvalid={!!errorMessage}
                {...rest}
            />
            <Form.Control.Feedback type="invalid" tooltip>
                {errorMessage}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextArea;