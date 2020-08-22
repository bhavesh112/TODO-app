# TODO-app
A MERN stack and Redux based TODO app as a Submission to GOTO mobility
Link to the [site!](http://todoapp2105.herokuapp.com)

# Quick Start

### Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret"
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```
## Frontend-Features
The frontend comprises of React and uses Redux for state management across the app.  
In `package.json` of react I have added `http://localhost:5000` as proxy so that I can make api calls using axios.  
Redux setup comprises of `store.js`, `actions folder`,`reducers folder`. The actions folder also consists of `types.js` that exports strings as constant.
This is done to prevent typos.

The features provided by the app :-  
### User Authentication
> The users need to register with the app to use the services.  
> Users once registered can directly Login to use the services.  

All the actions related to the user authentication are in the `client/src/actions/auth`. It provides the features of :-
* REGISTER 
* LOGIN
* LOGOUT 

If the `localStorage` has an active token user is directly taken to dashboard.Otherwise , he will have to REGISTER or LOGIN to set a token.
In case you aren't logged in you can't see the LOGOUT button in the `navbar` . If you are logged in you can't see the LOGIN , REGISTER AND HOME buttons in the `navbar`.  

All the below actions are in the `client/src/actions/notes`

### Add TODOS
> Once the user is logged in he is redirected to dashboard with a text box, which expands on clicking showing the `+ button` to add note.  
The user need to provide both `title` and `note` before submitting , other wise it fires an alert which is also done using redux.  

### View TODOS
> The existing and added todos are shown just below the text box and it updates with every action performed .This feature is also implemented using redux.
 After logging in If there are any existing TODOs in users account they are loaded spontaneously .
 
### Remove TODOS
> Every TODO comprises of a delete icon , which on clicking removes that TODO from state and database both. Due to the change in state the view TODOs updates.

### Modify TODOS
> Every TODO comprises of a edit icon , which on clicking changes the mode to edit mode. 
> * In this mode all the edit icons are hidden until submitting this edit.
> * The `add TODO text area` is changed to `edit TODO text area` which loads the values from the TODO whose edit icon was clicked 
> * `+ button` on the `edit TODO text area` patches the selected TODO by updating the database and state and brings you out of TODO mode.

## Backend-Features 
The backend used `Express` as Server and `MongoDB-atlas` as Database. 
### The following requests can be made to the backend:-
> #### POST /api/users
* This is public request.  
* This is used for registering the user and returns the token as response.  
* This request validates that `name`,`email` and `password` are not empty.
* It also validates that email needs to be unique.
* It returns the errors in case validation fails.  

> #### POST /api/auth
* This is public request.
* This is used for logging in the user and returns the token as response in case of success.
* This request validates that `email` and `password` are not empty.
* It returns the errors in case validation fails.
* It also returns error in case the details don't match.  

> #### GET /api/auth
* This is protected request.  
* It returns the user information from token.  

> #### GET /api/notes
* This is protected request.  
* This returns all the existing TODOs for the logged in user.  

> #### POST /api/notes
* This is protected request.  
* This allows user to add TODOs -one at a time.
* This request validates that `title` and `text` are not empty.
* This returns back all the TODOs after adding the required todo with new TODO at top.  

> #### DELETE /api/notes/:notes_id
* This is protected request.  
* This allows user to remove TODOs -one at a time.
* It takes `notes_id` as parameter to recognise which TODO to delete.
* This returns back all the TODOs after removing the required todo.  

> #### PATCH /api/notes/:notes_id
* This is protected request.  
* This allows user to modify TODOs -one at a time.
* It takes `notes_id` as parameter to recognise which TODO to modify.
* This returns back all the TODOs after modifiying the required todo.
* This request validates that modified `title` and `text` are not empty.  


> All the protected requests can only be made if header consists of `x-auth-token` for the logged In or registered User.

