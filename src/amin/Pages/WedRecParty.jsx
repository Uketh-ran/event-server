import React, { useEffect, useState } from "react";
import { Button, Table, Image } from "react-bootstrap";
import axios from "axios";
import WedrecpartyModal from "./WedRecPartyModal";


const WedRecParty = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5005/api/Wedrecparty");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

const deleteImage = async (imgName) => {
  if (!window.confirm("Are you sure want to delete this image?")) return;

  try {
    await axios.delete(`http://localhost:5005/api/Wedrecparty/delete-image/${encodeURIComponent(imgName)}`);
    fetchData(); // refresh table + image preview
  } catch (err) {
    console.log("Image delete error", err);
  }
};


  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Wedrecparty Decoration - Admin Panel</h2>

      <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
        + Add / Update
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Images Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && (
            <tr>
              <td style={{ maxWidth: "400px" }}>{data.description}</td>
              <td>{data.images.length}</td>
              <td>
                <Button variant="warning" onClick={() => setShowModal(true)}>Edit</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Image Preview Section */}
      <h5 className="mt-4">Uploaded Images</h5>
      <div className="d-flex flex-wrap gap-3">
        {data?.images?.map((img, index) => (
          <div key={index} className="position-relative">
            <Image
              src={`http://localhost:5005/uploads/Wedrecparty/${img}`}
              thumbnail
              style={{ width: "150px", height: "120px", objectFit: "cover" }}
            />
            <Button
              variant="danger"
              size="sm"
              className="position-absolute top-0 end-0"
              onClick={() => deleteImage(img)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>

      <WedrecpartyModal show={showModal} onHide={() => setShowModal(false)} refresh={fetchData} existing={data} />
    </div>
  );
};

export default WedRecParty;
