import React from "react";
import PaymentsTable from "../lib/components/payments/payments.table";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";
import { DUMMY_PAYMENTS } from "../lib/data/dummy_payments";

const PaymentsPage = () => {
  return (
    <ProfileProjectLayout>
      <PaymentsTable initialData={DUMMY_PAYMENTS} />
    </ProfileProjectLayout>
  );
};

export default PaymentsPage;
