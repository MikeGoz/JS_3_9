class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: [],
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
      .then(responseJson => this.setState({users: responseJson.items}))
      //.catch(console.log('Sorry...no users'))  not this time :)
      .then(console.log(this.state.users.length))
    if (this.state.users.length == 0) {
      console.log('Sorry...no users');
    }
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
        <h2>Users found: {this.state.users.length}</h2>
        <UsersList users = {this.state.users}/>
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

ReactDOM.render(
  <App />,
  document.getElementById('root')); 