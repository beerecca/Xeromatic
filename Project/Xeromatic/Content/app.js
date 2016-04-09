//React component that takes in some text as a property and displays it
var Tweet = React.createClass({
	render: function() {
		return (
			<li className="list-group-item">
				{this.props.text}
				{this.props.children}
			</li>
		)
	}
});

var Button = React.createClass({
	render: function() {
		return <button className="btn btn-info pull-right">{this.props.label}</button>
	}
});

//React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
var App = React.createClass({
	//React function that sets the initial state of the app (where changeable data is stored)
	getInitialState: function() {
		return {
			recentTweets: [],
			pinnedTweets: []
		};
	},

	//React function that runs after the app first loads
	componentDidMount: function() {
		var self = this;
		var recentFetch = fetch('/recentTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})

		var pinnedFetch = fetch('/pinnedTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})

		Promise.all([recentFetch, pinnedFetch])
			.then(function(data) {
				self.setState({recentTweets: data[0], pinnedTweets: data[1]});
			})
			.catch(function(error) {
				console.error('Error', error);
			});
	},

	//React function that runs on first load and whenever the state is changed
	render: function() {
		var pinnedTweets = (this.state.pinnedTweets.length > 0) ? this.state.pinnedTweets.map(function(tweet) {
			return <Tweet key={tweet.Id} text={tweet.Text} />
			})
			: null;

		var recentTweets = (this.state.recentTweets.length > 0) ? this.state.recentTweets.map(function(tweet) {
			return (
				<Tweet key={tweet.Id} text={tweet.Text}>
					<Button label="Pin" />
				</Tweet>
			)
			})
			: null;

		return (
			<div className="container">
				<h2>Welcome to the Xeromatic!</h2>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Pinned Tweets</h3>
					</div>
					<ul className="list-group">{pinnedTweets}</ul>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Recent Tweets</h3>
					</div>
					<ul className="list-group">{recentTweets}</ul>
				</div>
			</div>
		);
	}
});

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));