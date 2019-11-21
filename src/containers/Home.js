    import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import axios from "axios";

export default function Home(props) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const files = await loadFiles();
        setFiles(files);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadFiles() {
      //return[{ 'product_id' : '13', 'content' : 'file1'}, { 'product_id' : '14', 'content' : 'file2'}]

      return axios.get('http://127.0.0.1:5000/products', {
        params: {
            email: 'praveenthakur5@gmail.com'
        }
      }).then(res => {
          return res.data
      })
  }

  
  function renderFilesList(files) {
      console.info('files: ', files)
      return [{}].concat(files).map((file, i) =>
        i !== 0 ? (
            <ListGroupItem header={file.product_name.trim()}>

            </ListGroupItem>
        ) : (
          <LinkContainer key="new" to="/files/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Upload a new file
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
      );
  }
  

  function renderLander() {
    return (
      <div className="lander">
        <h1></h1>
        <p></p>
      </div>
    );
  }

  function renderFiles() {
    return (
      <div className="files">
        <PageHeader>Your Files</PageHeader>
        <ListGroup>
          {!isLoading && renderFilesList(files)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderFiles() : renderLander()}
    </div>
  );
}