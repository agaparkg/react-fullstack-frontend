import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import Person from "./Person";
import Loading from "./Loading";

const People = (props) => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsLoading(false);

    const url = "https://react-fullstack-backend.herokuapp.com/api/v1/people";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setPeople(data.people);
          setIsLoading(true);
        }, 500);
      })
      .catch((err) => console.log({ error: err.toString() }));
  }, []);

  const handleActions = (btn, id = 0) => {
    if (btn === "edit" || btn === "add") {
      props.history.push("/add");
      setModal((isModalOpen) => !isModalOpen);
    }

    if (btn === "delete") {
      fetch(
        `https://react-fullstack-backend.herokuapp.com/api/v1/person/delete?id=${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setMessage(() => data.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        })
        .catch((err) => console.log({ error: err.toString() }));

      setPeople((people) => people.filter((person) => person._id !== id));
    }
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-inner">
        {!isLoading ? (
          <Loading />
        ) : (
          <>
            {message && <div className="greeting">{message}</div>}
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
        )}
      </div>
    </div>
  );
};

export default People;

// http://localhost:5000/api/v1/people
