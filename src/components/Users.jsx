import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Input, Table } from 'reactstrap'

function Users() {


  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState(0)


  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(error => {
        alert(error.message);
      });
  }, [])

  const filtered = posts.filter(item => item.userId == value)




  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Select</h1>
      <Form>
        <FormGroup row>
          <Col sm={16}>
            <Input onChange={(e) => setValue(e.target.value)} value={value} id="exampleSelect" name="select" type="select">
              <option value="0">All</option>
              {
                data.map(item => <option value={item.id}>
                  {item.name}
                </option>)
              }
            </Input>
          </Col>
        </FormGroup>
      </Form>
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Posts</h1>
      <Table size="sm">
        <thead>
          <tr>
            <th>UserId</th>
            <th>Id</th>
            <th>Body</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {
            value == 0 ? posts.map(item => <tr><th scope="row">{item.userId}</th>
              <td>{item.id}</td>
              <td>{item.body}</td>
              <td>{item.title}</td></tr>) :
              filtered.map(item => <tr><th scope="row">{item.userId}</th>
                <td>{item.id}</td>
                <td>{item.body}</td>
                <td>{item.title}</td></tr>)
          }
        </tbody>
      </Table>
    </>

  )
}

export default Users