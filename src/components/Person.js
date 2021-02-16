import React from "react";
import { Button } from "reactstrap";

function Person({
  person: { fname, lname, age, email, _id },
  idx,
  handleActions,
}) {
  return (
    <tr>
      <th scope="row">{idx + 1}</th>
      <td>{fname}</td>
      <td>{lname}</td>
      <td>{age}</td>
      <td>{email}</td>
      <td>
        <Button
          id="edit"
          onClick={(e) => handleActions(e.target.id, _id)}
          color="primary"
        >
          Edit
        </Button>{" "}
        <Button
          id="delete"
          onClick={(e) => handleActions(e.target.id, _id)}
          color="danger"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Person;
