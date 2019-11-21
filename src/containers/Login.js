import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    var data = {
        "username" : fields.email,
        "password": fields.password
    }
    var header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
    };
    
    const options = {
        method : 'POST',
        headers: header,
        body: JSON.stringify(data)
    };

    // const request = new Request('http://localhost:8080/api/v1/users/login', options )
    // const response = await fetch(request);
    // const status = await response.status;

    props.userHasAuthenticated(true);
    props.history.push("/products");

  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="small">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="small">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="small"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>        
      </form>
    </div>
  );
}