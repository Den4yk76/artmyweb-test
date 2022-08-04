import { Route, Routes, Link } from 'react-router-dom';
import UsersTable from './components/UsersTable/UsersTable';
import EditUser from './components/EditUser/EditUser';
import Welcome from './components/Welcome/Welcome';
import s from './App.module.css';

export default function App() {
    return (
        <main className={s.container}>
            <div className={s.linksContainer}>
                <Link to={'/'} className={s.link}>
                    Welcome Page
                </Link>
                <Link to={'/users'} className={s.link}>
                    Users
                </Link>
            </div>

            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/edit" element={<EditUser />} />
            </Routes>
        </main>
    );
}
