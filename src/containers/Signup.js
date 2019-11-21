import React, { useState } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel  
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.firstname.length > 0 &&
      fields.lastname.length > 0 &&
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);    

    setIsLoading(false);
    var data = {
      "firstname" : fields.firstname, 
      "lastname" : fields.lastname,
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

  const request = new Request('http://localhost:8080/api/v1/users', options )
  const response = await fetch(request);  
  
  
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    var data = {
      "firstname" : fields.firstname, 
      "lastname" : fields.lastname,
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

  const request = new Request('http://localhost:8080/api/v1/users', options )
  const response = await fetch(request);  

  //props.userHasAuthenticated(true);
//props.history.push("/");
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (      
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="firstname" bsSize="small">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.firstname}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="lastname" bsSize="small">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.lastname}
            onChange={handleFieldChange}
          />
        </FormGroup>
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
        <FormGroup controlId="confirmPassword" bsSize="small">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="small"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>   
      </form>      
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}