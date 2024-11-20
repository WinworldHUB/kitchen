import { FC, useMemo } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../../constants";
import { getStatusColor } from "../../utils/color";

type Total = {
  title: string;
  amount: number;
};

const DUMMY_TOTAL: Total[] = [
  { title: "Total Amount", amount: 10000 },
  { title: "Total Paid", amount: 5000 },
  { title: "Total Outstanding", amount: 5000 },
];

const PaymentsTable: FC<DataTableProps<Payment>> = ({ initialData }) => {
  const columns: TableColumn<Payment>[] = useMemo(() => {
    return [
      {
        name: "Payment Schedule",
        selector: (row) => row.paymentSchedule,
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
          const { color } = getStatusColor(row.status);
          return (
            <div
              className="fw-bold"
              style={{
                color: color,
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

  return (
    <Container fluid>
      <Row className="mb-3  py-2 mx-2 border border-primary rounded-pill">
        {DUMMY_TOTAL.map((total, index) => (
          <Col key={index} className="d-flex align-items-center">
            <div className="fs-3 fw-light">{`${total.title}: $${total.amount}`}</div>
          </Col>
        ))}
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
    </Container>
  );
};

export default PaymentsTable;
