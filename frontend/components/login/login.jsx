import React from "react"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"

export class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = { username: "", password: ""}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.hidden = true
        this.flipHidden = this.flipHidden.bind(this)
        this.timer
        this.phone = 0;
        this.changePhone = this.changePhone.bind(this)
    }

    handleSubmit(e){
        if (e) e.preventDefault()
        this.props.processForm({ username: this.state.username, password: this.state.password})
    }

    update(e){
        this.setState( { [e.target.name]: e.target.value } )
    }

    async loginDemo(e){
        this.setState( {username: "", password: ""} )
        let user = "Demo_User"
        let pass = "Demo_Password"
        await this.timeout(125)
        document.getElementById('signInUsernameInput').focus();
        for (let i = 0; i < user.length; i++) {
            await this.timeout(150)
            this.setState( {username: (this.state.username + user[i] )})
        }
        await this.timeout(175)
        document.getElementById('signInPasswordInput').focus();
        for (let i = 0; i < pass.length; i++) {
            await this.timeout(125)
            this.setState( {password: (this.state.password + pass[i] )})
        }
        await this.timeout(100)
        this.handleSubmit()
    }

    timeout(ms){
        return new Promise( resolve => setTimeout(resolve, ms));
    }

    flipHidden(e){
        e.preventDefault()
        this.hidden = !this.hidden
        this.forceUpdate()
    }
    
    componentDidMount(){
        this.changePhone()
    }

    async changePhone(){
        await this.timeout(3000)
        this.phone = (this.phone + 1) % 4
        this.forceUpdate()
        this.changePhone()
    }

    render(){
        if (this.props.session !== null){
            return <Redirect to="/" />
        } else {
            let usernameContainerClassName = "signInUsernameInputContainer"
            if (this.state.username.length) usernameContainerClassName += " transition"
            let passwordContainerClassName = "signInPasswordInputContainer"
            if (this.state.password.length) passwordContainerClassName += " transition"
            let disabled = true
            if (this.state.username.length && this.state.password.length > 5) {
                disabled = false;
            }
            let phoneURL;
            if (this.phone === 0) {phoneURL = window.phoneURL_0}
            if (this.phone === 1) {phoneURL = window.phoneURL_1}
            if (this.phone === 2) {phoneURL = window.phoneURL_2}
            if (this.phone === 3) {phoneURL = window.phoneURL_3}
            return (
                <div className="signInGrid">


                    <div className="signInColumn">

                        <div className="signInContainer">
                            <form onSubmit={this.handleSubmit} className="signInForm">
                                <h1 className="signInTitle">the gram</h1>
                                    <div className={usernameContainerClassName}>
                                        <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" id="signInUsernameInput" className="signInUsernameInput" value={this.state.username} name="username" onChange={this.update} />
                                    </div>
                                    <div className={passwordContainerClassName}>
                                        <input type={this.hidden ? "password" : "text"} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" id="signInPasswordInput" className="signInPasswordInput" value={this.state.password} name="password" onChange={this.update} />
                                        <button className="showHideButton" onClick={(e) => this.flipHidden(e)}>{this.hidden ? "Show" : "Hide"}</button>
                                    </div>
                                <button type="submit" disabled={disabled} className="signInButton">Sign In</button>
                            </form>
                            <div className="orContainer">
                                <div className="line"></div>
                                <span className="or">OR</span>
                                <div className="line"></div>
                            </div>
                            <button className="demoUserButton" onClick={() => this.loginDemo()}>Demo User</button>
                        </div>

                        <div className="signupLinkContainer">
                            <p className="signupText">Don't have an account?
                                <Link to="/signup" className="createAccountLink">
                                     <span>Sign up</span>
                                </Link>
                            </p>
                        </div>

                        <p className="getTheApp">Get the app.</p>
                        <div className="downloadLinks">
                            <img className="appleLogo" src={window.appleURL} alt="apple" />
                            <img className="androidLogo" src={window.androidURL} alt="android" />
                        </div>

                    </div>

                    <div className="imageColumn">
                        <img className="phoneImg" src={phoneURL} alt="phone" />
                    </div>
                        

                </div>
            )
        }
    }

}