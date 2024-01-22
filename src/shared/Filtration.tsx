import {Dropdown, Form} from 'react-bootstrap';
import React from "react";

interface FilterProps {
  children: React.ReactNode;
  title: string;
}

export const FilterComponent = ({ children, title }: FilterProps) => {
  return (
     <Form>
       <Form.Group controlId="filter">
         <Dropdown>
           <Dropdown.Toggle variant="success" id="dropdown-basic">
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

