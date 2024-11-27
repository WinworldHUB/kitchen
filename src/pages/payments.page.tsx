import React, { useEffect } from "react";
import PaymentsTable from "../lib/components/payments/payments.table";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import { useParams } from "react-router-dom";
import useApi from "../lib/hooks/useApi";
import { PAYMENT_APIS } from "../lib/constants/api-constants";

const PaymentsPage = () => {
  const { projectId } = useParams();
  const { getData: getPayments, data: paymentsData } =
    useApi<GetPaymentsResponse>();

  useEffect(() => {
    const getPaymentData = async () => {
      try {
        await getPayments(`${PAYMENT_APIS.GET_PAYMENTS_API}/${projectId}`);
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentData();
  }, [projectId]);

  return (
    <ProfileProjectLayout>
      <PaymentsTable
        paymentStat={paymentsData?.paymentStat}
        projectId={projectId}
        initialData={paymentsData?.payments}
      />
    </ProfileProjectLayout>
  );
};

export default PaymentsPage;
