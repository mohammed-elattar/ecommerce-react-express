import React from 'react';
import { Nav } from 'react-bootstrap';
interface Props {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}
const CheckoutSteps: React.FC<Props> = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        <Nav.Link href='/login' disabled={!step1}>
          Sign In
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/shipping' disabled={!step2}>
          Shipping
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/payment' disabled={!step3}>
          Payment
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href='/placeorder' disabled={!step4}>
          Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
