import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE } from "../../constants";


const MembersDataTable: FC<DataTableProps<Payment>> = ({
  data,
  onDataImport,
  isEditable = true,
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
        name: "Payment Status",
        selector: (row) => row.status,
        sortable: true,
      },

    ];
  }, []);


  return (
    <Card>
      <Card.Body>
        <DataTable
          columns={columns}
          data={data}
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