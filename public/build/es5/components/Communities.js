"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var api = _interopRequire(require("../utils/api"));

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var connect = require("react-redux").connect;
var CommunityPreview = _interopRequire(require("../components/CommunityPreview"));

var Nav = _interopRequire(require("../components/Nav"));

var Communities = (function (Component) {
	function Communities(props, context) {
		_classCallCheck(this, Communities);

		_get(Object.getPrototypeOf(Communities.prototype), "constructor", this).call(this, props, context);
		this.updateNewCommunity = this.updateNewCommunity.bind(this);
		this.addCommunity = this.addCommunity.bind(this);
		this.login = this.login.bind(this);
		this.updateCredentials = this.updateCredentials.bind(this);
		this.state = {
			newCommunity: {
				name: "",
				city: "",
				address: "",
				state: ""
			},
			credentials: {
				firstName: "",
				lastName: "",
				email: "",
				password: ""
			}
		};
	}

	_inherits(Communities, Component);

	_prototypeProperties(Communities, null, {
		updateCredentials: {
			value: function updateCredentials(event) {
				//		console.log('updateUser: '+event.target.id+' == '+event.target.value)
				var credentials = Object.assign({}, this.state.credentials);
				credentials[event.target.id] = event.target.value;
				this.setState({
					credentials: credentials
				});
			},
			writable: true,
			configurable: true
		},
		login: {
			value: function login(event) {
				event.preventDefault();
				//		console.log(JSON.stringify(this.state.user))

				api.handlePost("/account/login", this.state.credentials, function (err, response) {
					if (err != null) {
						alert(err.message);
						return;
					}

					//			console.log(JSON.stringify(response))
					window.location.href = "/account";
				});
			},
			writable: true,
			configurable: true
		},
		componentDidMount: {

			// constructor(props, context){
			// 	super(props, context)
			// 	this.updateUser = this.updateUser.bind(this)
			// 	this.updateCredentials = this.updateCredentials.bind(this)
			// 	this.register = this.register.bind(this)
			// 	this.login = this.login.bind(this)
			// 	this.state = {
			// 		user: {
			// 			firstName: '',
			// 			lastName: '',
			// 			email: '',
			// 			password: ''
			// 		},
			// 		credentials: {
			// 			email: '',
			// 			password: ''				
			// 		}
			// 	}
			// }

			// 	updateUser(event){
			// //		console.log('updateUser: '+event.target.id+' == '+event.target.value)
			// 		var updatedUser = Object.assign({}, this.state.user)
			// 		updatedUser[event.target.id] = event.target.value
			// 		this.setState({
			// 			user: updatedUser
			// 		})
			// 	}

			// 	updateCredentials(event){
			// //		console.log('updateUser: '+event.target.id+' == '+event.target.value)
			// 		var credentials = Object.assign({}, this.state.credentials)
			// 		credentials[event.target.id] = event.target.value
			// 		this.setState({
			// 			credentials: credentials
			// 		})
			// 	}

			// 	register(event){
			// 		event.preventDefault()
			// 		api.handlePost('/api/profile', this.state.user, function(err, response){
			// 			if (err){
			// 				alert(err.message)
			// 				return
			// 			}

			// 			window.location.href = '/account'
			// 		})
			// 	}

			// 	login(event){
			// 		event.preventDefault()
			// //		console.log(JSON.stringify(this.state.user))

			// 		api.handlePost('/account/login', this.state.credentials, function(err, response){
			// 			if (err != null){
			// 				alert(err.message)
			// 				return
			// 			}

			// //			console.log(JSON.stringify(response))
			// 			window.location.href = '/account'
			// 		})

			// 	}

			// constructor(props, context){
			// 	super(props, context)
			// 	this.updateNewCommunity = this.updateNewCommunity.bind(this)
			// 	this.addCommunity = this.addCommunity.bind(this)
			// 	this.state = {
			// 		newCommunity: {
			// 			name:'',
			// 			city:'',
			// 			address:'',
			// 			state:''
			// 		}
			// 	}
			// }

			value: function componentDidMount() {
				api.handleGet("/api/community", null, function (err, response) {
					if (err) {
						alert("OOPS! " + err);
						return;
					}

					store.dispatch(actions.communitiesReceived(response.results));
				});
			},
			writable: true,
			configurable: true
		},
		addCommunity: {
			value: function addCommunity(event) {
				event.preventDefault();
				//		console.log('Add Community: '+JSON.stringify(this.state.newCommunity))
				api.handlePost("/api/community", this.state.newCommunity, function (err, response) {
					if (err) {
						alert("OOPS - " + err);
						return;
					}

					console.log("Community CREATED: " + JSON.stringify(response));
					store.dispatch(actions.communityCreated(response.result));
				});
			},
			writable: true,
			configurable: true
		},
		updateNewCommunity: {
			value: function updateNewCommunity(event) {
				//		console.log('updateNewCommunity: '+event.target.id+' = '+event.target.value)
				var community = Object.assign({}, this.state.newCommunity);
				community[event.target.id] = event.target.value;
				this.setState({
					newCommunity: community
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var list = this.props.communities.map(function (community, i) {
					return React.createElement(CommunityPreview, { key: community.id, community: community });
				});



				return React.createElement(
					"div",
					null,
					React.createElement(Nav, { transparent: "yes" }),
					React.createElement(
						"section",
						{ id: "slider", style: { background: "url(\"images/quilt.jpg\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
						React.createElement("br", null)
					),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_three_fifth bothsidebar nobottommargin" },
									React.createElement(
										"div",
										{ className: "fancy-title title-border" },
										React.createElement(
											"h3",
											null,
											"Communities"
										)
									),
									React.createElement(
										"div",
										{ id: "posts", className: "events small-thumbs" },
										list
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third nobottommargin" },
									React.createElement(
										"div",
										{ className: "well well-lg nobottommargin" },
										React.createElement(
											"form",
											{ id: "login-form", name: "login-form", className: "nobottommargin", action: "#", method: "post" },
											React.createElement(
												"h3",
												null,
												"Log In "
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "login-form-username" },
													"Email"
												),
												React.createElement("input", { onChange: this.updateCredentials, type: "text", id: "email", name: "email", placeholder: "Email", className: "required form-control input-block-level" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "login-form-password" },
													"Password:"
												),
												React.createElement("input", { onChange: this.updateCredentials, type: "state", id: "password", name: "login-form-password", placeholder: "Password", className: "required form-control input-block-level" })
											),
											React.createElement(
												"div",
												{ className: "col_full nobottommargin" },
												React.createElement(
													"button",
													{ onClick: this.login, className: "button button-3d nomargin", id: "login-form-submit", name: "login-form-submit" },
													"Create Account"
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "well well-lg nobottommargin" },
										React.createElement(
											"form",
											{ id: "create-a-community-form", name: "login-form", className: "nobottommargin", action: "#", method: "post" },
											React.createElement(
												"h3",
												null,
												"Create a Community"
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "create-a-community-form-name" },
													"Community Name"
												),
												React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "name", name: "city", placeholder: "Community Name", className: "required form-control input-block-level" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "create-a-community-form-address" },
													"Address:"
												),
												React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "address", name: "create-a-community-form-address", placeholder: "Address", className: "required form-control input-block-level" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "create-a-community-form-city" },
													"City:"
												),
												React.createElement("input", { onChange: this.updateNewCommunity, type: "text", id: "city", name: "create-a-community-form-city", placeholder: "City", className: "required form-control input-block-level" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "create-a-community-form-password" },
													"State:"
												),
												React.createElement("input", { onChange: this.updateNewCommunity, type: "state", id: "state", name: "create-a-community-form-state", placeholder: "State", className: "required form-control input-block-level" })
											),
											React.createElement(
												"div",
												{ className: "col_full nobottommargin" },
												React.createElement(
													"button",
													{ onClick: this.addCommunity, className: "button button-3d nomargin", id: "create-a-community-form-submit", name: "create-a-community-form-submit" },
													"Create Community"
												)
											)
										)
									)
								)
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Communities;
})(Component);

var stateToProps = function (state) {
	console.log("STATE TO PROPS: " + JSON.stringify(state));
	return {
		communities: state.communityReducer.communitiesArray


	};
};

module.exports = connect(stateToProps)(Communities);