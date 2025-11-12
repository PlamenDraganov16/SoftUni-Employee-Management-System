import { useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Pagination from './components/Pagination.jsx'
import SearchForm from './components/SearchForm.jsx'
import UserList from './components/UserList.jsx'
import CreateUserModal from './components/CreateUserModal.jsx'

function App() {
    const [showCreateUser, setShowCreateUser] = useState(false);

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    }

    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <SearchForm />

                    <UserList />

                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>


                    <Pagination />

                </section>

                {showCreateUser && <CreateUserModal />}
            </main>

            <Footer />
        </div>
    )
}

export default App
