import { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './create.users.css';
import './list.users.css';
import { listUsers } from './users.service';

export const ListUsers = () => {
    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();
    
    useEffect(() => {
        reduxDispatch(listUsers());
    }, [reduxDispatch]);
    const navigate = useNavigate();
    const routeChange = () =>{ 
      navigate('/create');
    }
  
    var renderData = () =>
    reduxState.users.users.map((user) => {
      var values = Object.values(user).map((value: any) => <td>{value}</td>);
      return (
        <tr>
          {values}
        </tr>
      );
    });
  return (
    <div >
        {/* {
            reduxState.users.errorMessage !== null
            &&
            <strong>Error: {reduxState.users.errorMessage}</strong>
        } */}
        <h1> Users </h1>
        <button className='btn' onClick={routeChange}>Add</button>
      <table>
        <thead> 
          <tr>
            <td>ID</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Email</td>
            <td>Phone</td>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
    </div>
  );
};
