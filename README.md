# YAMRS
Yet another movie rating site

## About the project
This project is a challenge to be done in a few days. It is asked to develop a movie rating website with the following requirements (quoted from the original coding_challenge.md file):
> Coding Challenge Guidelines
> ===========================
> 
> Please organize, design, test, document and deploy your code as if it were
> going into production, then send us a link to the hosted repository (e.g.
> Github, Bitbucket...).
> 
> Functional spec
> ---------------
> 
> Prototype the following project:
> 
> 
> ### Movie Reviews
> 
> 
> Create an app that publicly lists paginated movie reviews. Atleast this basic info should be shown: movie title, nickname/fullname of user who submited review, review text, review stars given
> The app should allow non-authenticated users to submit movie reviews (text + star selection).
> Once a movie review is submited a simple email should be sent to "admin" users. 
> The email should contain a link to "protected" page where admins can approve + (possibly correct) or reject the review. Once the review gets approved, it should appear on the public review list page.
> 
> 
> Please use any 3rd-party API services that you deem necessary, i.e:
> 
> * [The Movie Db](https://www.themoviedb.org) 
> 
> Most of the 3rd-party api services have free/freemium plans.
> Please register your own test accounts on each.
> 
> 
> 
> Technical spec
> --------------
> 
> The architecture will be split between a back-end and a web front-end so full-stack. 
> Use **GraphQL** as your API communication "protocol".
> Use **Typescript** for any javascript related parts.
> 
> ### Back-end
> 
> In General we believe there is no one-size-fits-all technology. Good engineering is about
> using the right tools and libraries for the right job, and constantly learning about them.
> Therefore, feel free to mention in your `README` how much experience you have
> with the technical stack / libraries you choose, we will take note of that when reviewing
> your challenge.
> 
> Since this is a specific case, we would like you to use one of the following languages:
> 
> * Node.js (typescript) 
> * Go
> 
> Any of the following dabtabases:
> 
> * mysql
> * postgresql
> * mongodb
> * other - describe in your README why it was chosen. 
> 
> You are also free to use any web framework or library. If you choose to use a framework
> that results in boilerplate code in the repository, please detail in your
> README which code was written by you (as opposed to generated code).
> 
> ### Front-end
> 
> The front-end should use React (with typescript) ideally be a single page app (where applicable)
> 
> You are also free to use any web framework or library. If you choose to use a framework
> that results in boilerplate code in the repository, please detail in your
> README which code was written by you (as opposed to generated code).
> 
> Host it!
> --------
> When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, Zeit Now, etc.).

Within this project a fully functional fullstack website with backend and a graphql api has to be developed. Ideally wholly documented, tested and deployed (production ready) in a few days. The main pitfall within this project for me as a frontend developer is learning how to develop in the backend realm in a short amount of time. Therefore, the guiding principle in choosing the technology is speed of prototyping (without any prior knowledge).

## Run this project
1. Create `frontend/src/config.json` with
```
{
  "apiKey": "",
  "gqlPath": "http://localhost:8080/graphql",
  "adminName": "admin",
  "adminPassword": "wasabipeas"
}
```
`gqlPath` is the path of the graphql api. The rest has to be unchanged. The username and password are used to access the "protected" administration page on the website.
2. Create `backend/config/config.go` with
```
package config

var DBConfig = struct{
	User string
	Password string
}{
	User: "<dbuser>",
	Password: "<dbpassword>",
}

var EmailConfig = struct{
	User string
	Password string
	Recipients []string
}{
	User: "<email>",
	Password: "<emailpassword>",
	Recipients: []string{"<recipients>"},
}
```
The first user and password is used for database access. The second config block is used for sending emails.
3. Run `go run backend/main.go`.
4. Go into directory `frontend/` and `yarn start`.

## Technical and architectural choices
### Backend
In the backend I chose the language "Go", because as far as I can tell from what I hear about it, it seems to be a rising star in the backend. And because I never coded with it I wanted to give it a try.

Using Go there are not really many options for choosing a graphql library for the api. In the beginning I tried "gqlgen", but dumped it shortly after, because the building process seemed too inconvenient. So I continued with "graphql-go", which is one of the most liked libraries (measured by github stars) and it turned out to be a very solid choice.

As a database I chose MongoDB Atlas as hosted document store. It seemed a good fit, because it is firstly hosted with free plans, so no own configurations weren't needed and later possible scalability is independent of the rest of the backend and secondly it is a document store, providing more flexibility and speed than a relational database. Also, mongodb looks like a good fit for beginners in the database world. But since the application has few demands on performance and data security, actually most databases would have been a proper choice.

### Frontend
Frontend was already set in stone: React with typescript. No graphql client has been used. I looked up Apollo client, but it really seemed like an overkill for this project. For React the command line tool `create-react-app` has been used.

## What is still missing and what to do better
- Tests: I am used to implement tests in the end. Unfortunately, there was no time left to implement them. Most code has been tested manually while coding, but that still leaves much space for many bugs.
- Comments: Maybe, the code could use some more comments. Really complex parts are commented, but they are quite rare.
- Hosting: The application is not hosted unfortunately. There was no time anymore to do it (I have never done that and I would have needed much more time to learn, how to do that).
- Frontend authentication: Frontend authentication is really bad. It is most likely not secure and the backend is completely free of authentication. There is much more room to use for it. Some graphql queries could be protected with an access token, which could be retrieved on the server itself. But that would have been to time consuming to implement here in this short time.
- Database document field "_id": On inserting a new document into the database a new "_id" is generated, which could be used for approving a review. It is saved as an ObjectID. I tried to use that in Go, but I wasted really much time by trying to convert it somehow while decoding it into a struct and I could not find anything useful on the internet on how to do that. Finally I added an own field "id" as string and used it. It seems kind of hacky, but it works. Maybe in the future it would be useful to tackle this problem again (although I am not sure, whether the advantages are really big for reducing the number of fields in the documents by 1 - also I am not really sure, but I think I read somewhere, that querying on an ObjectID is somewhat faster than on a string).
- Time management: I started a little bit late with the project and it turned out to be a little bit too late considering, that I was not able anymore to write tests and host the application. But I realized that it is really helpful to introduce intermediate goals to achieve. You get a much better structure of all the task you have to do and the time they will require. Also I tend to spend much time on minor tasks like writing the code for my buttons. But the code is now reusable and the buttons look really nice now!
- Movie Image Grid Space: There is a space on the right side of the movie image grid on page start (window resizing fixes it) and it drives me crazy!
- Design: Obviously, there is always space for better design.