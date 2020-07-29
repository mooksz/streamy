import React, { useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = props => {
	const { signIn, signOut, isSignedIn } = props;
	const authInstanceRef = useRef();

	const onAuthChange = useCallback(
		isSignedIn => {
			isSignedIn
				? signIn(authInstanceRef.current.currentUser.get().getId())
				: signOut();
		},
		[signIn, signOut]
	);

	const onSignInClick = () => {
		authInstanceRef.current.signIn();
	};

	const onSignOutClick = () => {
		authInstanceRef.current.signOut();
	};

	useEffect(() => {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"156683022175-7ftqi4vs956lc22cq5h6itfsmflvqlgn.apps.googleusercontent.com",
					scope: "email",
				})
				.then(() => {
					//Create instance
					authInstanceRef.current = window.gapi.auth2.getAuthInstance();

					//Are we already signed in?
					onAuthChange(authInstanceRef.current.isSignedIn.get());

					//Listen to callback
					authInstanceRef.current.isSignedIn.listen(onAuthChange);
				});
		});
	}, [onAuthChange]);

	return (
		<>
			{isSignedIn === null ? (
				<button className="ui loading button">Loading...</button>
			) : isSignedIn ? (
				<button onClick={onSignOutClick} className="ui red google button">
					<i className="google icon" /> Sign out
				</button>
			) : (
				<button onClick={onSignInClick} className="ui red google button">
					<i className="google icon" />
					Sign in with Google
				</button>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
