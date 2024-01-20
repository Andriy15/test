import {Dropdown, Form} from 'react-bootstrap';
import {FilterProps} from "./models.ts";

export const FilterComponent = ({ children }: FilterProps) => {
  return (
     <Form>
       <Form.Group controlId="filter">
         <Form.Label>Filter</Form.Label>
         <Dropdown>
           <Dropdown.Toggle variant="success" id="dropdown-basic">
             {children}
           </Dropdown.Toggle>

            <Dropdown.Menu>
              {children}
            </Dropdown.Menu>
         </Dropdown>

       </Form.Group>
     </Form>
  )
}

// <Dropdown.Item onClick={() => handleFilterChange('2021-01-01')}>2021-01-01</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-02')}>2021-01-02</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-03')}>2021-01-03</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-04')}>2021-01-04</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-05')}>2021-01-05</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-06')}>2021-01-06</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-07')}>2021-01-07</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-08')}>2021-01-08</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-09')}>2021-01-09</Dropdown.Item>
// <Dropdown.Item onClick={() => handleFilterChange('2021-01-10')}>2021-01-10</Dropdown.Item>