//React component that takes in some text as a property and displays it
var Tweet = React.createClass({
	render: function() {
		return <li className="list-group-item">{this.props.text}</li>
	}
});

//React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
var App = React.createClass({
	//React function that sets the initial state of the app (where changeable data is stored)
	getInitialState: function() {
		return {tweets: []};
	},

	//React function that runs after the app first loads
	componentDidMount: function() {
		var self = this;
		fetch('/recentTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				self.setState({tweets: data});
			})
			.catch(function(error) {
				console.error('Error', error);
			});
	},

	//React function that runs on first load and whenever the state is changed
	render: function() {
		var tweets = (this.state.tweets.length > 0) ? this.state.tweets.map(function(tweet) {
			return <Tweet key={tweet.Id} text={tweet.Text} />
			})
			: null;

		return (
			<div className="container">
				<h2>Welcome to the Xeromatic!</h2>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Pinned Tweets</h3>
					</div>
					<ul className="list-group">{tweets}</ul>
				</div>
			</div>
		);
	}
});

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));