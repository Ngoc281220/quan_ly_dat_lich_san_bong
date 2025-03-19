import React from "react";
import { Form } from "react-bootstrap";

function CommonInput({ type, placeholder, options, label, value, onChange, max, error }) {
  switch (type) {
    case "select":
      return (
        <Form.Group className="my-2">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
          <Form.Control isInvalid={!!error} as="select" onChange={onChange} size="lg">
            <option>{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option.id ?? option}>
                {option.name ?? option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    case "date":
      return (
        <Form.Group className="my-2">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
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
        <Form.Group className="my-2">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
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
        <Form.Group className="my-2">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
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
        <Form.Group className="my-2">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
          <Form.Control value={value} multiple  size="lg" type="file" onChange={onChange} />
        </Form.Group>
      );
    case "textarea":
      return (
        <Form.Group className="my-2">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
          <Form.Control
            as="textarea"
            value={value}
            placeholder={placeholder}
            style={{ height: "150px" }}
          />
        </Form.Group>
      );
    default:
      return (
        <Form.Group className="my-2 fs-08">
          {label && <Form.Label className="text-gray-700">{label}</Form.Label>}
          <Form.Control
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            size="lg"
            className="fs-08"
            maxLength={max}
            isInvalid={!!error}
          />
        </Form.Group>
      );
  }
}

export default CommonInput;
