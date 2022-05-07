# Jobs API

RESTful API based on Node JS, Express JS, and SQLite. 

## Features

- Login (JWT, bcrypt)
- Read All Jobs (opt: description, location, full_time, page)
- Read Job by id

## Valid User

List of valid user:
```
username: admin
password: 12345
```
```
username: bona
password: bona
```

## Call the API

Use these headers to make requests to the API:

```
Content-Type:application/x-www-form-urlencoded
Accept:application/json
```

When logged in, you should provide the access token automatically(cookies) or manually:

```
Authorization: <access_token>
```

**This token is valid for 3 hours.**

## API response

Here are the valid response example of each endpoint:

**/api/login**
```json
{
    "success": true,
    "username": "bona",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJEYXRhIjp7ImlkIjoyLCJlbWFpbCI6ImJvbmEifX0sImlhdCI6MTY1MTkxNDI5NywiZXhwIjoxNjUxOTI1MDk3fQ.cA9LydVF2CTd119V6Nw1nMBMRYigvdBhAEmtpi8HVjY"
}
```

**/api/jobs?description=python&location=berlin&full_time=true**

```json
[
    {
        "id": "f4a7c47f-c8ac-49fa-b15b-4ab37bfd2307",
        "type": "Full Time",
        "url": "https://jobs.github.com/positions/f4a7c47f-c8ac-49fa-b15b-4ab37bfd2307",
        "created_at": "Tue May 18 09:52:30 UTC 2021",
        "company": "Blindside",
        "company_url": "https://www.blindside.pro",
        "location": "Berlin",
        "title": "Flutter Developer",
        "description": "<p>Blindside is a sports tech start...",
        "how_to_apply": "<p><a href=\"https://blindside.join.com/jobs/2248922-flutter-developer?pid=357a3b4531918760973f&amp;oid=1b7223ae-85f3-44df-b767-57095fc2735d&amp;utm_source=github_jobs&amp;utm_medium=paid&amp;utm_campaign=single%2Bposting&amp;utm_content=flutter%2Bdeveloper\">https://blindside.join.com/jobs/2248922-flutter-developer?pid=357a3b4531918760973f&amp;oid=1b7223ae-85f3-44df-b767-57095fc2735d&amp;utm_source=github_jobs&amp;utm_medium=paid&amp;utm_campaign=single%2Bposting&amp;utm_content=flutter%2Bdeveloper</a></p>\n",
        "company_logo": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzZqIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--23cbad69864ba3e2e6614bda12beda0b08c03c68/blindside.jpg"
    }
]
```

**/api/jobs/32bf67e5-4971-47ce-985c-44b6b3860cdb**
```json
{
    "id": "32bf67e5-4971-47ce-985c-44b6b3860cdb",
    "type": "Full Time",
    "url": "https://jobs.github.com/positions/32bf67e5-4971-47ce-985c-44b6b3860cdb",
    "created_at": "Wed May 19 00:49:17 UTC 2021",
    "company": "SweetRush",
    "company_url": "https://www.sweetrush.com/",
    "location": "Remote",
    "title": "Senior Creative Front End Web Developer",
    "description": "<p><strong>SweetRush has an exciting ..."
    "how_to_apply": "<p>If this describes your interests and experience, please submit your current resume and salary requirements through the following link:\n<a href=\"https://www.sweetrush.com/join-us/\">https://www.sweetrush.com/join-us/</a></p>\n",
    "company_logo": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUtqIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82886ff47e94ff4c0255b95773a9667644768b2b/SR%20Logo.png"
}
```

## Installation

#### Requirements

- NPM
- Node and Express
- Prisma
- SQLite

```
git clone https://github.com/bonaventurabs/jobs-api.git
cd jobs-api
npm install
```

Run application

```
npm run dev 
```

Open the API

```
curl --request GET \
  --url http://localhost:3000/api
```
