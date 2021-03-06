class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: [],
      searchDone: false
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items, searchDone: true }))
      .catch(err => this.setState({ users: [], searchDone: true }))
  }  

  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">SEARCH THE GITHUB BY USER NAME</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        { this.state.users.length === 0 && this.state.searchDone ? <NoUserFound /> : <UsersList users={this.state.users}/> }
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }
  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <span>
        <img src={this.props.user.avatar_url} style={{maxWidth: '120px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </span>
    );
  }
}

class NoUserFound extends React.Component {
  render() {
    return <h1>Sorry, no users</h1>;
  }
}
 
ReactDOM.render(<App />, document.getElementById('root')); 