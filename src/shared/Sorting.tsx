import {Dropdown, Form} from "react-bootstrap";
import React from "react";

interface Props {
    children: React.ReactNode;
    title: string;
}

export const SortingComponent = ({children, title}: Props) => {
  return (
     <Form>
       <Form.Group controlId='sort'>
         <Dropdown>
           <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginLeft: '10px' }}>
             {title}
           </Dropdown.Toggle>
           <Dropdown.Menu>
             {children}
           </Dropdown.Menu>
         </Dropdown>
       </Form.Group>
     </Form>
  )
}