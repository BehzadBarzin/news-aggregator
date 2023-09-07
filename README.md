# How To Run
- Run: ```docker-compose up```
- Wait for a few minutes (~5 Minutes) for the aggregation jobs to be posted to database and start executing by the queue worker
- Go to ```localhost:3000``` and use the app

# Containers
- ```backend```: Provides access to backend api through port ```8000```
- ```queue```: Runs the backend project's queue worker that executes jobs from database
- ```scheduler```: Runs the backend project's scheduler that posts jobs to database to aggregate data from sources
- ```frontend```: Runs the react application (frontend) on port ```3000```
- ```db```: The shared db instance
- ```phpmyadmin```: Let's us access and view the db