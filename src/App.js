import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

var styles = {
	"dataStyle": {
		"marginTop": "20px",
		"marginBottom": "20px",
		"color": "blue",
	},
	"appBarStyle": {
		'marginBotton': "10px"
	}
}
class getData extends React.Component {

	constructor() {
		super();
		this.state = {
			"nameTextField": "", // This is where the content for the TextField used below is stored 
			"HeartRateMeasurements": []
		}
	}

	onNameTextFieldChange = (event) => {
		// Update the nameTextField state whenever the text field is changed or perturbed in any way:
		this.setState({"nameTextField": event.target.value});
	}

	onButtonClick = (event) => {
		console.log(this.state.nameTextField); // log the current nameTextField content
	}

	getHeartRate = () => {

		var URL = "http://vcm-3579.vm.duke.edu:5000/api/heart_rate/" + this.state.nameTextField
		axios.get(URL).then( (response) => {
			console.log('hello')
			console.log(response.status);
			// logs status
			console.log(this.state.nameTextField)
			// logs email
			console.log(response.data);
			// logs response based on email
			this.setState({"HeartRateMeasurements": JSON.stringify(response.data)});
		})	
	}

	render() {
		return (
			<div>
			    <AppBar position="static" style={styles.appBarStyle}>
		                <Toolbar>
		                    <Typography variant="title" color="inherit">
		                        My HRM Frontend Site
		                    </Typography>
		                </Toolbar>
		            </AppBar>

				<TextField 
					value={this.state.nameTextField}
					onChange={this.onNameTextFieldChange}/>

				<Button onClick={this.getHeartRate}>
					Obtains data
				</Button>

				<div style={styles.dataStyle}>
					{this.state.HeartRateMeasurements}
				</div>

			</div>
		);
	}
}

export default getData;

