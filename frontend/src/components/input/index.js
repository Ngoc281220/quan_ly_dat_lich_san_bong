import React from "react";
import { Form } from "react-bootstrap";

function CommonInput({ type, placeholder, options, label, value, onChange }) {
  switch (type) {
    case "select":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control as="select" onChange={onChange}>
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
          <Form.Control
            type="date"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        </Form.Group>
      );
    case "password":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            type="password"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        </Form.Group>
      );
    case "email":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            type="email"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        </Form.Group>
      );
    case "file":
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control value={value} type="file" onChange={onChange} />
        </Form.Group>
      );
    default:
      return (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        </Form.Group>
      );
  }
}

export default CommonInput;
