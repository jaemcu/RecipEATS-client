import React, { Component, Fragment } from 'react'
// 1. import withRouter
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Nav from '../shared/Nav.js'

// 2. import Home
import Home from '../routes/Home.js'
// 3. import Recipes
import Recipes from '../routes/Recipes.js'
// 4. import 1 Recipe from '../Routes/Recipe.js'
import Recipe from '../routes/Recipe.js'
// 5. Import createRecipe
import RecipeCreate from '../routes/RecipeCreate.js'
// 6. Import editRecipe
import RecipeEdit from '../routes/RecipeEdit.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <Nav user={user} />
        <Route path='/sign-up' render={() => (
          <SignUp alert={this.alert} setUser={this.setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn alert={this.alert} setUser={this.setUser} />
        )} />
        <main className="container" id="mainContainer">
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/' component={Home} />
          <AuthenticatedRoute user={user} exact path='/recipes' render={({ match }) => (
            <Recipes alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes/:id' render={({ match }) => (
            <Recipe alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/create-recipe' render={({ match }) => (
            <RecipeCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/recipes/:id/edit' render={({ match }) => (
            <RecipeEdit alert={this.alert} user={user} match={ match } />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
