import { useState, useEffect } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Pagination from './components/Pagination.jsx'
import SearchForm from './components/SearchForm.jsx'
import UserList from './components/UserList.jsx'
import CreateUserModal from './components/CreateUserModal.jsx'

function App() {
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/users')
            .then(response => response.json())
            .then(result => {
                setUsers(Object.values(result));
            })
            .catch((err) => alert(err.message));
    }, []);

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const closeUserModalHandler = () => {
        setShowCreateUser(false);
    }

    const addUserSubmitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const { country, city, street, streetNumber, ...userData } = Object.fromEntries(formData);
        userData.address = {
            country,
            city,
            street,
            streetNumber,
        };

        userData.createdAt = new Date().toISOString();

        fetch('http://localhost:3030/jsonstore/users', {
            method: 'POST',
            header: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
    }

    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <SearchForm />

                    <UserList users = {users}/>

                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>


                    <Pagination />

                </section>

                {showCreateUser && <CreateUserModal onSubmit={addUserSubmitHandler} onClose={closeUserModalHandler} />}
            </main>

            <Footer />
        </div>
    )
}

export default App
