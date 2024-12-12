import Container from "react-bootstrap/Container";
import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { ItemsContext } from "../../context/ItemsContext";
import './checkout.css'

const initialValues = {
  phone: "",
  email: "",
  name: "",
};

export const Checkout = () => {
  const [buyer, setBuyer] = useState(initialValues);
  const { items, reset, removeItems } = useContext(ItemsContext);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const total = items.reduce(
    (acc, act) => acc + (act.precio * act.quantity || 0),
    0
  );

  const handleChange = (eve) => {
    setBuyer((prev) => ({
      ...prev,
      [eve.target.name]: eve.target.value,
    }));
  };

  const handleOrder = async () => {
    const order = {
      buyer: buyer,
      items: items,
      total: total,
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    try {
      const docRef = await addDoc(orderCollection, order);
      if (docRef.id) {
        setOrderSuccess(`Su compra ha sido procesada correctamente`);

        setTimeout(() => {
          reset();
          setBuyer(initialValues);
        }, 3000);
      }
    } catch (error) {
      console.error("Error al procesar la compra: ", error);
    }
  };

  if (!items.length && !orderSuccess)
    return <Alert variant="light">No hay ningún producto seleccionado</Alert>;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card className="mb-8 w-full">
            <h3>Resumen de lista</h3>
            <Card.Body>
                            {items?.map((i) => (
                <Row key={i.id} className="mb-4">
                  <Col md={5}>
                    <img src={i.imagen} alt="torta" className="img-fluid" />
                  </Col>
                  <Col md={7}>
                    <h6>{i.nombre}</h6>
                    <p>Cantidad: {i.quantity}</p>
                    <p>Precio unitario: ${Number(i.precio)}</p>
                    <p>Total: ${Number(i.precio) * i.quantity}</p>
                    <Button variant="info" onClick={() => removeItems(i.id)}>
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              ))}
              <h4>Total de la compra: ${total}</h4>
              <hr />
              <button type="button" className="btn btn-primary" onClick={reset}>
                Reset
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
          <h3>Datos del cliente</h3>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="name"
                    value={buyer.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    name="email"
                    value={buyer.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su teléfono"
                    name="phone"
                    value={buyer.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  onClick={handleOrder}
                  className="w-100"
                >
                  Comprar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {orderSuccess && (
        <Alert variant="success" className="mt-4">
          {orderSuccess}
        </Alert>
      )}
    </Container>
  );
};

export default Checkout;