import React from "react";
import { Card, Button } from "react-bootstrap";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";

function CommonCard({
  image,
  title,
  location,
  distance,
  time,
  phone,
  rating,
  tags,
}) {
  return (
    <Card className="mb-3 shadow-sm card-container">
      <div
        className="card-background"
        style={{
          backgroundImage: image
            ? `url(${image})`
            : "linear-gradient(#555, #777)",
        }}
      >
        <div className="card-overlay">
          <div className="card-content">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {rating && (
                  <span className="badge bg-warning text-dark me-2">
                    <FaStar /> {rating}
                  </span>
                )}
                {tags &&
                  tags.map((tag, index) => (
                    <span key={index} className="badge bg-success me-1">
                      {tag}
                    </span>
                  ))}
              </div>
              <div>
                <FaHeart className="text-light me-2" />
                <FaShareAlt className="text-light" />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title className="mt-2 fs-6 text-light">
                  {title}
                </Card.Title>
                <Card.Text className="text-light fs-14 mb-2">
                  <FaMapMarkerAlt /> {distance} - {location}
                </Card.Text>
                <Card.Text className="text-light fs-12 mb-2">
                  <FaPhone /> {phone} | ⏰ {time}
                </Card.Text>
              </div>
              <Button variant="warning" className="fs-14 fw-bold text-white">ĐẶT LỊCH</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CommonCard;
