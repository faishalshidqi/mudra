# Mudra
## Introduction
Mudra is a hand sign learning platform that aims to help people communicate with the Deaf and Mute.

# Course and Challenge API
## How to replicate
- Commands are done **in terminal**
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

## Endpoints
- GET /courses\
supporting filter by type using query parameter `?type=` \
supported value = **ASL, BISINDO, SIBI** \
for example: /courses?type=SIBI

#### Success Response (200 OK)
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
        "created_at": "ISO Date text",
        "updated_at": "ISO Date text"
      },
      {
        "id": "text",
        "title": "text",
        "type": "text",
        "image_url": "text",
        "description": "long text",
        "created_at": "ISO Date text",
        "updated_at": "ISO Date text"
      }
    ]
  }
}
```

#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- GET /courses/{id}
#### Success Response (200 OK)
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
      "created_at": "ISO Date text",
      "updated_at": "ISO Date text"
    }
  }
}
```
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- GET /challenges \
  supporting filter by type using query parameter `?type=`\
  supported value = **ASL, BISINDO, SIBI**\
  for example: /challenges?type=SIBI
#### Success Response (200 OK)
```json
{
  "status": "text",
  "data": {
    "challenges": [
      {
        "id": "text",
        "title": "text",
        "description": "long text",
        "course_id": "text",
        "answer": "text",
        "type": "text"
      },
      {
        "id": "text",
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
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- GET /challenges/{id}
#### Success Response (200 OK)
```json
{
  "status": "text",
  "data": {
    "challenge": {
      "id": "text",
      "title": "text",
      "description": "long text",
      "course_id": "text",
      "answer": "text",
      "type": "text"
    }
  }
}
```
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
# Manager API
## How to Replicate
- All commands are done in terminal
- Ensure you have git installed on your machine. Use this command in terminal to ensure the git installation. <br> `git --version`
  <br> If you haven't installed git, please follow the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install git.
- Ensure you have nodejs installed on your machine. Use this command in terminal to ensure the nodejs installation. <br> `node -v`
  <br> If you haven't installed nodejs, please download it from [here](https://nodejs.org/en/download).
- After git is installed, clone this repo using this command <br>
  ```git clone -b managers https://github.com/faishalshidqi/capstone-api```
- Ensure the cloned directory has a package.json file
- Install the nodejs dependencies using this command
  <br>`npm install`
- Use this command to start the development server
  <br>`npm run start-dev`
- Use this command to start the production server
  <br>`npm run start`

## Endpoints
- GET /kll/courses\
  supporting filter by type using query parameter `?type=`\
  supported value = **ASL, BISINDO, SIBI**\
  for example: /kll/courses?type=SIBI
#### Success Response (200 OK)
```json
{
  "status": "text",
  "data": {
    "courses": [
      {
        "course_id": "text",
        "title": "text",
        "sign_pict_link": "text",
        "description": "long text",
        "type": "text",
        "created_at": "ISO Date text",
        "updated_at": "ISO Date text",
        "is_deleted": "boolean"
      },
      {
        "course_id": "text",
        "title": "text",
        "sign_pict_link": "text",
        "description": "long text",
        "type": "text",
        "created_at": "ISO Date text",
        "updated_at": "ISO Date text",
        "is_deleted": "boolean"
      }
    ]
  }
}
```
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- GET /kll/courses/{id}
#### Success Response (200 OK)
```json
{
  "status": "text",
  "data": {
    "course": {
      "course_id": "text",
      "title": "text",
      "sign_pict_link": "text",
      "description": "long text",
      "type": "text",
      "created_at": "ISO Date text",
      "updated_at": "ISO Date text",
      "is_deleted": "boolean"
    }
  }
}
```
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- GET /kll/challenges\
  supporting filter by type using query parameter `?type=`\
  supported value = **ASL, BISINDO, SIBI**\
  for example: /kll/challenges?type=SIBI

#### Success Response
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
        "created_at": "ISO Date text",
        "updated_at": "ISO Date text",
        "is_deleted": "boolean",
        "type": "text"
      },
      {
        "challenge_id": "text",
        "title": "text",
        "description": "long text",
        "course_id": "text",
        "answer": "text",
        "created_at": "ISO Date text",
        "updated_at": "ISO Date text",
        "is_deleted": "boolean",
        "type": "text"
      }
    ]
  }
}
```
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- GET /kll/challenges/{id}
#### Success Response (200 OK)
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
      "created_at": "ISO Date text",
      "updated_at": "ISO Date text",
      "is_deleted": "boolean",
      "type": "text"
    }
  }
}
```
#### Fail Response (404 Not Found)
```json
{
  "status": "text",
  "message": "text"
}
```
- POST /kll/courses
#### Body Payload
```json
{
    "title": "text",
    "sign_pict_link": "text",
    "description": "text",
    "type": "text",
    "is_deleted": "boolean"
}
```
#### Success Response (200 OK)
```json
{
    "status": "text",
    "message": "text",
    "data": {
        "course_id": "text"
    }
}
```
#### Fail Response (400 Bad Request)
```json
{
  "status": "text",
  "message": "text"
}
```
- POST /kll/challenges
#### Body Payload
```json
{
    "title": "text", 
    "description": "long text", 
    "course_id": "text", 
    "answer": "text", 
    "is_deleted": "boolean", 
    "type": "text"
}
```
#### Success Response (200 OK)
```json
{
    "status": "text",
    "message": "text",
    "data": {
        "challenge_id": "text"
    }
}
```
#### Fail Response (400 Bad Request)
```json
{
    "status": "text",
    "message": "text"
}
```
- PUT /kll/courses/{id}
#### Body Payload
```json
{
  "title": "text",
  "sign_pict_link": "text",
  "description": "long text",
  "type": "text",
  "is_deleted": "boolean"
}
```
#### Success Response
```json
{
    "status": "text",
    "message": "text"
}
```
#### Fail Response
```json
{
    "status": "text",
    "message": "text"
}
```
- PUT /kll/challenges/{id}
#### Body Payload
```json
{
    "title": "text", 
    "description": "long text", 
    "course_id": "text", 
    "answer": "text", 
    "is_deleted": "boolean", 
    "type": "text"
}
```
#### Success Response
```json
{
  "status": "text",
  "message": "text"
}
```
#### Fail Response
```json
{
  "status": "text",
  "message": "text"
}
```
- DELETE /kll/courses/{id}
#### Success Response
```json
{
  "status": "text",
  "message": "text"
}
```
#### Fail Response
```json
{
  "status": "text",
  "message": "text"
}
```
- DELETE /kll/challenges/{id}
#### Success Response
```json
{
  "status": "text",
  "message": "text"
}
```
#### Fail Response
```json
{
  "status": "text",
  "message": "text"
}
```

