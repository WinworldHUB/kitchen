import { FC, useContext, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Dropdown,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE, PaymentStatus } from "../../constants";
import { getStatusColor } from "../../utils/color";
import { AppContext } from "../../contexts/appcontext";
import useApi from "../../hooks/useApi";
import { PAYMENT_APIS } from "../../constants/api-constants";

type CreatePaymentRequest = {
  title: string;
  amount: number;
  dueDate: string;
};

interface PaymentsTableProps {
  projectId: string;
  initialData: Payment[];
  paymentStat: PaymentStat[];
  setTriggerFetch: React.Dispatch<React.SetStateAction<number>>;
}

const PaymentsTable: FC<PaymentsTableProps> = ({
  projectId,
  initialData,
  paymentStat,
  setTriggerFetch,
}) => {
  const { appState } = useContext(AppContext);
  const { postData: postPaymentData } = useApi<GeneralAPIResponse>();
  const { putData: updatePaymentStatus } = useApi<GeneralAPIResponse>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(PaymentStatus.Pending);
  const [paymentForm, setPaymentForm] = useState<CreatePaymentRequest>({
    title: "",
    amount: 0,
    dueDate: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const payment: CreatePaymentRequest = {
      title: paymentForm.title,
      amount: paymentForm.amount,
      dueDate: paymentForm.dueDate,
    };

    const response = await postPaymentData(
      `${PAYMENT_APIS.CREATE_PAYMENT_API}/${projectId}/add`,
      payment
    );
    if (response.success) {
      toggleModal();
      setTriggerFetch((prevState) => prevState + 1);
    }
  };

  const handleStatusChange = async (paymentId:string, newStatus: string) => {
    try {
      setStatus(newStatus);
      await updatePaymentStatus(
        `${PAYMENT_APIS.UPDATE_PAYMENT_API}/${paymentId}/update/status`,
        { status: newStatus }
      );
      setTriggerFetch((prevState) => prevState + 1);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const columns: TableColumn<Payment>[] = useMemo(() => {
    return [
      {
        name: "Payment Schedule",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Payment Amount",
        selector: (row) => `$${row.amount}`,
        sortable: true,
      },
      {
        name: "Due Date",
        selector: (row) => row.dueDate,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row) => {
          
          return appState.isAdmin ? (
            <Dropdown>
              <Dropdown.Toggle
                className="px-4 fs-6 outline-0 border border-primary shadow-none"
                style={{
                  backgroundColor: "transparent",
                  color: getStatusColor(row.status).color,
                }}
              >
                {row.status}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.values(PaymentStatus).map((projectStatus) => (
                  <Dropdown.Item
                    key={projectStatus}
                    onClick={() => handleStatusChange(row.id,projectStatus)}
                    className="text-center"
                    style={{
                      color: getStatusColor(projectStatus).color,
                    }}
                  >
                    {projectStatus}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div
              className="fw-bold"
              style={{
                color: getStatusColor(row.status).color,
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {row.status}
            </div>
          );
        },
        sortable: true,
      },
    ];
  }, []);

  console.log("Payment Stats Logged:", paymentStat);

  return (
    <Container fluid>
      <Row className="mb-3 px-2">
        <Col>
          <h1 className="fs-2">Payments</h1>
        </Col>
        {appState?.isAdmin && (
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={toggleModal}>
              Add Payment
            </Button>
          </Col>
        )}
      </Row>
      <Row className="mb-3 py-2 mx-2 border border-primary rounded-pill">
        {paymentStat?.length > 0 ? (
          paymentStat.map((total, index) => (
            <Col key={index} className="d-flex align-items-center">
              <div className="fs-3 fw-light">
                {total.title
                  ? `${total.title}: $${total.amount ?? "0"}`
                  : "No data available"}
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <div className="fs-3 fw-light">No payment data available</div>
          </Col>
        )}
      </Row>

      <Card>
        <Card.Body>
          <DataTable
            columns={columns}
            data={initialData}
            striped
            highlightOnHover
            pagination
            customStyles={DATA_TABLE_DEFAULT_STYLE}
          />
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formPaymentTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payment title"
                name="title"
                value={paymentForm.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPaymentAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter payment amount"
                name="amount"
                value={paymentForm.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPaymentDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={paymentForm.dueDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentsTable;
