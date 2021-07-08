import React from "react";
import { Card, CardBody, CardHeader } from "../../../../_ui/layout/elements";
import InstallationsFilter from "./installations-filter/InstallationsFilter";
import InstallationsList from "./installations-list/InstallationsList";
import ActionsCard from "./../actions/ActionsCard";

function InstallationsCard() {
  return (
    <>
      <ActionsCard />
      <Card>
        <CardHeader title="Installations list"></CardHeader>
        <CardBody>
          <InstallationsFilter />

          <InstallationsList />
        </CardBody>
      </Card>
    </>
  );
}

export default InstallationsCard;
