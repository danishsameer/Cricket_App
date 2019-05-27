import React, { Component } from 'react';
import './App.css';
/*
  1. Grab the data and set the state first
*/

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: [],
			match: []
		};
		this.individualData = this.individualData.bind(this);
	}
	componentDidMount() {
		fetch('https://cricscore-api.appspot.com/csa')
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					matches: json
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	individualData(e, id) {
		fetch('https://cricscore-api.appspot.com/csa?id=' + id)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					match: json
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const { matches, match } = this.state;
		const data = matches.map((item, index) => {
			return (
				<tr key={item.id}>
					<td>{item.t1}</td>
					<td>{item.t2}</td>
					<td>
						<a href="#" onClick={() => this.individualData(this, item.id)}>
							Show Result
						</a>
					</td>
				</tr>
			);
		});
		const singleMatchData = match.map((item, index) => {
			return (
				<div key={item.id}>
					<div>{item.de}</div>
					<div>{item.si}</div>
				</div>
			);
		});
		return (
			<div className="App container">
				<h1>Cricket Scores</h1>
				<div className="row">
					<div className="col-lg-6">
						<table className="table table-striped">
							<tbody>{data}</tbody>
						</table>
					</div>
					<div className="col-lg-6">{singleMatchData}</div>
				</div>
			</div>
		);
	}
}

export default App;
