

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import axios from "axios";

const WedPhotoModal = ({ show, onHide, refresh, existing }) => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // New images to upload
  const [existingImages, setExistingImages] = useState([]); // Already uploaded images

  // Initialize modal state when opened
  useEffect(() => {
    setDescription(existing?.description || "");
    setExistingImages(existing?.images || []);
    setImages([]);
  }, [existing, show]);

  // Delete existing image
  const deleteExistingImage = async (imgName) => {
    if (!window.confirm("Are you sure to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:5005/api/WedPhoto/delete-image/${encodeURIComponent(imgName)}`);
      setExistingImages(prev => prev.filter(img => img !== imgName)); // update modal immediately
      refresh(); // refresh table
    } catch (err) {
      console.error("Image delete error", err);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", description);
    images.forEach(img => formData.append("images", img));

    try {
      if (!existing) {
        await axios.post("http://localhost:5005/api/WedPhoto", formData);
      } else {
        // Update description
        await axios.put(`http://localhost:5005/api/WedPhoto/${existing._id}`, { description });

        // Add new images if any
        if (images.length > 0) {
          await axios.post(`http://localhost:5005/api/WedPhoto/images/${existing._id}`, formData);
        }
      }

      refresh();
      onHide();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Wedding Photo & Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Upload New Images (Multiple)</Form.Label>
            <Form.Control type="file" multiple onChange={(e) => setImages([...e.target.files])} />
          </Form.Group>

          {existingImages.length > 0 && (
            <>
              <h6 className="mt-3">Existing Images</h6>
              <div className="d-flex flex-wrap gap-2">
                {existingImages.map((img, index) => (
                  <div key={index} className="position-relative">
                    <Image
                      src={`http://localhost:5005/uploads/WedPhoto/${img}`}
                      thumbnail
                      style={{ width: "120px", height: "100px", objectFit: "cover" }}
                    />
                    <Button
                      size="sm"
                      variant="danger"
                      className="position-absolute top-0 end-0"
                      onClick={() => deleteExistingImage(img)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WedPhotoModal;
