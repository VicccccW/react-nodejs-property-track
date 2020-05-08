# React Nodejs App

this app prototype the integration between react, nodejs, and Salesforce

## Branch

**Hooks-State-Mgmt-Version**
this branch uses Context and Hooks to manage the state and implement the React app
this branch also refactor some code in the the Redux branch with React methedology

**Redux-State-Mgmt-Version**
this branch is the initial and a backup version of this app
this branch uses Redux for state management

**feature/SF-Platform-Event**
implement Salesforce Platform Event in the project
use SF PE to notify Heroku App about SF property Data Change
use Server-Sent Events to push message from Node to React

**PENDING - feature/refactor server salesforce module**
extract Salesforce related fucntions or components out from authRoute into a new file

## Orgs Connect Setting

Salesforce Developer Edition as DevHub, linking to Heroku App Production version

Salesforce Scratch Org with 30 days lifetime, linking to Heroku App Stage version

Salesforce Scratch Org with 7 days lifetime, linking to Heroku App localhost version

## Salesforce Auth

the server side uses jsforce OAuth2 to authorize the user
