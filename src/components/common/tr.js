import React from "react";

function Tr({ label, value }) {
  if (typeof value === "object") value = value.join(", ");
  return (
    <tr>
      <td className="font-weight-bold">{label}</td>
      <td>{value}</td>
    </tr>
  );
}

export default Tr;
