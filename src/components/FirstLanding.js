import React from "react";
import { Card } from "react-bootstrap";

export default function FirstLanding() {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div
        className="flex-grow-1 overflow-auto main-body"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <Card
          className="w-50 m-5 5"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <Card.Header style={{ backgroundColor: "#01ff70", color: "black" }}>
            Featured
          </Card.Header>
          <Card.Body>
            <Card.Title>Hey, nice to see you</Card.Title>
            <Card.Text>
              Looks like your contact book is empty. Go to contacts to add
              someone.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
