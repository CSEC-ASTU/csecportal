import React from "react";
import Divisions from "./_components/divisions";

export default async function Page({
  params,
}: {
  params: Promise<{ divisionId: string }>;
}) {
  const { divisionId } = await params;

  return <Divisions id={divisionId} name="Capacity Building" />;
}
