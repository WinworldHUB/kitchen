import React, { useEffect, useState } from "react";
import PaymentsTable from "../lib/components/payments/payments.table";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import { useParams } from "react-router-dom";
import useApi from "../lib/hooks/useApi";
import { PAYMENT_APIS } from "../lib/constants/api-constants";

const PaymentsPage = () => {
  const { projectId } = useParams();
  const { getData: getPayments, data: paymentsData } =
    useApi<GetPaymentsResponse>();

  const [triggerFetch, setTriggerFetch] = useState<number>(0);

  useEffect(() => {
    const getPaymentData = async () => {
      try {
        await getPayments(`${PAYMENT_APIS.GET_PAYMENTS_API}/${projectId}`);
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentData();
  }, [projectId, triggerFetch]);

  return (
    <ProfileProjectLayout>
      <PaymentsTable
        paymentStat={paymentsData?.paymentStat}
        projectId={projectId}
        initialData={paymentsData?.payments}
        setTriggerFetch={setTriggerFetch}
      />
    </ProfileProjectLayout>
  );
};

export default PaymentsPage;
