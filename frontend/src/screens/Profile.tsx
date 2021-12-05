import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Profile = () => {
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default Profile;
