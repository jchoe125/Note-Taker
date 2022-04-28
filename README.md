# Express.js: Note Taker

# Table of Contents
  * Description
  * Installation
  * User Story
  * Video Walkthrough
  * Screenshots
  * License
  * Questions
  * Submission

# Description
This note-taking application called Note Taker allows the user to:
    * Write and save notes using an Express.js back-end
    * Save and retrieve note data from a JSON file

The application’s front-end has already been created. The app's back-end was built, connected to the front-end, and deployed to Heroku.

# User Story
```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

# Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```
On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

The following HTML routes should be created:

* `GET /notes` should return the `notes.html` file.

* `GET *` should return the `index.html` file.

The following API routes should be created:

* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

As a bonus, the DELETE route to the application was added using the following guideline:

* `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

# Video Walkthrough
![Video Walkthrough](./Assets/11-express-homework-demo-01.png)

# Screenshots
![App Screenshot](./Assets/11-express-homework-demo-01.png)

# Technologies Used
JavaScript
NPM
Node.js
Express.js
Heroku

# Questions
If you have any questions, please send them to my GitHub profile

# Submission
Link to GitHub repository: https://github.com/jchoe125/Professional-README-Generator






### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

  * Application front end must connect to an Express.js back end.

  * Application back end must store notes that have a unique id in a JSON file.

  * Application must be deployed to Heroku.


### Deployment: 36%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository contains application code.



## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository, with a unique name and a README describing the project.

- - -
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
