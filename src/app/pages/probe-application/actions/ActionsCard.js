import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../../../_ui/layout/elements";
import actionRepository from "../../../repositories/probe-application/action/actionRepository";

function ActionsCard() {
  const [probeApplicationGenerated, setProbeApplicationGenerated] =
    useState(false);
  const [probeApplicationRequested, setProbeApplicationRequested] =
    useState(false);

  function downloadBase64File(base64Data) {
    const linkSource = `data:application/octet-stream;base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = "ProbeApplicationSetup.msi";
    downloadLink.click();
  }

  const downloadSetup = async () => {
    var response = await actionRepository.getSetup();
    downloadBase64File(response.data.result);
    console.log(response);
  };

  const requestSetup = async () => {
    var response = await actionRepository.requestSetup();
    console.log(response);
  };

  const getSetupStatus = async () => {
    var response = await actionRepository.getSetupStatus();
    setProbeApplicationGenerated(response.data.result[0]);
    setProbeApplicationRequested(response.data.result[1]);
  };

  useEffect(() => {
    getSetupStatus();
  }, []);

  return (
    <Card className="mb-2">
      <CardBody>
        {!probeApplicationGenerated && !probeApplicationRequested && (
          <button onClick={requestSetup}>Request</button>
        )}
        {probeApplicationGenerated && probeApplicationRequested && (
          <button onClick={downloadSetup}>Download</button>
        )}
      </CardBody>
    </Card>
  );
}

export default ActionsCard;
