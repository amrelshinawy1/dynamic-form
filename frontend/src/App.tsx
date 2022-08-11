import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Users } from './modules/users/create.users';
import { ListUsers } from './modules/users/list.users';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListUsers />} />
                <Route path="/create" element= {<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
