class UserRow extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
            </tr>
        );
    }
}

class UserTable extends React.Component {
    render() {
        const filterText = this.props.filterText;

        const rows = [];

        this.props.users.forEach((user) => {
            if (user.name.indexOf(filterText) === -1) {
                return;
            }
            rows.push(
                <UserRow
                    user={user}
                    key={user.id}
                />
            );
        });
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
    }
}

class SearchBar extends React.Component {
    FilterUserChange = this.FilterUserChange.bind(this);

    FilterUserChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.FilterUserChange}
                />
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        filterText: '',
        users: []
    };

    componentDidMount() {
        getUsers(url).then(u => this.setState({ users: u }))
            .catch(error => console.log('Request failed', error));
    }

    handleFilterTextChange = (filterText) => {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <UserTable
                    users={this.state.users}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}

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
const getsUser = [];

function generateUserList(users) {
    return users.map((u) => ({ ['id']: u.id, ['name']: u.name, ['username']: u.username, ['email']: u.email }));
}

function getUsers(url) {
    return fetch(url)
        .then(r => r.json())
        .then(generateUserList);
};

ReactDOM.render(<App />, document.getElementById('root'));

