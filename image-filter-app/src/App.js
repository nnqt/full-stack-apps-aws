import './App.css';
import { useState } from 'react';
import axios from 'axios';

function ImageComponent () {
  const [imageUrl, setImageUrl] = useState("")
  const [filteredImageUrl, setFilteredImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setFilteredImageUrl("");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/filteredimage?image_url=${encodeURIComponent(
          imageUrl
        )}`
      );
      setFilteredImageUrl(response.request.responseURL);
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Filter App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send Image"}
        </button>
      </form>

      {error && <div>{error}</div>}

      {filteredImageUrl && (
        <div>
          <h2>Filtered Image:</h2>
          <img
            src={filteredImageUrl}
            alt="Filter Img"
          />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ImageComponent />
    </div>
  );
}

export default App;
