import React from "react";
import { Form } from "react-bootstrap";

function CommonInput({ type, placeholder, options, label, onChange }) {
  switch (type) {
    case "select":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control as="select">
            <option>{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    case "date":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control type="date" placeholder={placeholder} />
        </Form.Group>
      );
    case "password":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control type="password" placeholder={placeholder} />
        </Form.Group>
      );
    case "file":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control type="file" onChange={onChange} />
        </Form.Group>
      );
    default:
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control type="text" placeholder={placeholder} />
        </Form.Group>
      );
  }
}

export default CommonInput;
