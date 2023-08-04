import React from "react";
import { Image } from "react-bootstrap";

export default function Disconnect() {
  return (
    <div className="App">
      <div className="text-center">
        <Image
          thumbnail
          src="images/smiley.gif"
          style={{ height: 300, width: 300 }}
        />
      </div>
      <h2 className="alert alert-success mt-1 p-5 text-center icontext fw-bold">
        Oh...ho! Sorry, There's Some issue at Server Side
      </h2>
    </div>
  );
}
