import React from "react";
import { Table, Button } from "reactstrap";
import Person from "./Person";

const People = ({ people, handleActions }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, idx) => {
            return (
              <Person
                key={person._id}
                person={person}
                idx={idx}
                handleActions={handleActions}
              />
            );
          })}
        </tbody>
      </Table>
      <Button
        id="add"
        onClick={(e) => handleActions(e.target.id)}
        color="primary"
      >
        Add New Person
      </Button>
    </>
  );
};

export default People;
