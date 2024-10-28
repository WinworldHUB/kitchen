import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../../constants";
import { getStatusColor } from "../../utils/color";

const MembersDataTable: FC<DataTableProps<Payment>> = ({
  initialData,
}) => {
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
            className=" fw-bold"
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
  );
};

export default MembersDataTable;
