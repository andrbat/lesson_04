function UserRow(props) {
    const { user } = props;
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
        </tr>
    );
};

function UserTable(props) {
    const rows = props.users
        .filter(user => user.name.includes(props.filterText))
        .map(user => <UserRow user={user} key={user.id} />);
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

function SearchBar(props) {

    function FilterUserChange(e) {
        props.onFilterTextChange(e.target.value);
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={props.filterText}
                onChange={FilterUserChange}
            />
        </form>
    );
};

function App() {
    const [filterText, setFilter] = React.useState('');
    const [users, setUser] = React.useState([]);

    React.useEffect(() => {
        getUsers(url)
            .then(u => setUser(u))
            .catch(error => console.log('Request failed', error));
    }, []);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                onFilterTextChange={(e) => setFilter(e)}
            />
            <UserTable
                users={users}
                filterText={filterText}
            />
        </div>
    );
};

UserRow.propTypes = {
    user: PropTypes.array.isRequired
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    filterText: PropTypes.string.isRequired
};
SearchBar.propTypes = {
    onFilterTextChange: PropTypes.object
};

const url = 'https://jsonplaceholder.typicode.com/users';

function generateUserList(users) {
    return users.map((u) => ({ ['id']: u.id, ['name']: u.name, ['username']: u.username, ['email']: u.email }));
}

function getUsers(url) {
    return fetch(url)
        .then(r => r.json())
        .then(generateUserList);
};

ReactDOM.render(<App />, document.getElementById('root'));

