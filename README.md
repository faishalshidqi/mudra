# Mudra API
## Introduction
<br>
Mudra is a hand sign learning platform that aims to help people communicate with the Deaf and Mute.

## How to replicate
- Ensure you have git installed on your machine. Use this command in terminal to ensure the git installation. <br> `git --version`
<br> If you haven't installed git, please follow the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install git.
- Ensure you have nodejs installed on your machine. Use this command in terminal to ensure the nodejs installation. <br> `node -v`
<br> If you haven't installed nodejs, please download it from [here](https://nodejs.org/en/download).
- After git is installed, clone this repo using this command <br> 
```git clone -b api https://github.com/faishalshidqi/capstone-api```
- Ensure the cloned directory has a package.json file
- Install the nodejs dependencies using this command
<br>`npm install`
- Use this command to start the development server
<br>`npm run start-dev`
- Use this command to start the production server
<br>`npm run start`

Endpoints
- GET /courses
```json
{
  "status": "text",
  "data": {
    "courses": [
      {
        "id": "text",
        "title": "text",
        "type": "text",
        "image_url": "text",
        "description": "long text",
        "created_at": "ISO Date",
        "updated_at": "ISO Date"
      },
      {
        "id": "text",
        "title": "text",
        "type": "text",
        "image_url": "text",
        "description": "long text",
        "created_at": "ISO Date",
        "updated_at": "ISO Date"
      }
    ]
  }
}
```
- GET /courses/{id}
```json
{
  "status": "text",
  "data": {
    "course": {
      "id": "text",
      "title": "text",
      "type": "text",
      "image_url": "text",
      "description": "long text",
      "created_at": "ISO Date",
      "updated_at": "ISO Date"
    }
  }
}
```
- GET /challenges
```json
{
  "status": "text",
  "data": {
    "challenges": [
      {
        "challenge_id": "text",
        "title": "text",
        "description": "long text",
        "course_id": "text",
        "answer": "text",
        "type": "text"
      },
      {
        "challenge_id": "text",
        "title": "text",
        "description": "long text",
        "course_id": "text",
        "answer": "text",
        "type": "text"
      }
    ]
  }
}
```
- GET /challenges/{id}
```json
{
  "status": "text",
  "data": {
    "challenge": {
      "challenge_id": "text",
      "title": "text",
      "description": "long text",
      "course_id": "text",
      "answer": "text",
      "type": "text"
    }
  }
}
```
- GET /kll/courses
