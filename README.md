- [What's expected from you?](#whats-expected-from-you)
- [The problem](#the-problem)
- [API Requirements](#api-requirements)
  - [User creation](#user-creation)
  - [Repositories](#repositories)
    - [Authentication](#authentication)
    - [Create](#create)
    - [List](#list)
    - [Detail](#detail)
    - [Delete](#delete)
- [View Requirements](#view-requirements)
  - [Single user repository](#single-user-repository)
  - [All user repositories](#all-user-repositories)
  - [Filters](#filters)

## What's expected from you?

This is the problem to solve, for the [Python / Django Engineer](https://dev.bg/company/jobads/hacksoft-python-django-backend-engineer/) position at HackSoft.

1. The solution should be using Python / Django.
1. You can use any 3rd party library.
1. We expect the result to be sent to `careers@hacksoft.io`, as an attached `.zip` file.
1. We expect to have a Django project in that zip.
1. Any additional documentation / overview / diagrams can also be included in that zip.
1. We expect the solution to be sent in 7 days after you've received the task.

## The problem

GitHub keeps repository analytics data for the past 14 days & you can view that from your `Insights` dashboard (example below)

![image](https://user-images.githubusercontent.com/387867/108621962-9b771880-743e-11eb-8198-32ddd40582fa.png)

You are running a popular open source library & you want to see data for longer intervals (for the past 14 days).

Luckily, GitHub exports the traffic data via an API (also returns the last 14 days) - <https://docs.github.com/en/rest/reference/repos#get-page-views>

**You have to build a simple Django application**, that:

1. Fetches the data from the API on a daily basis.
1. Stores it.
1. Over time, achieves the goal to have repository traffic data for more than 14 days.

The app will have both an API part & a view (templates) part.

## API Requirements

### User creation

Expore the following API endpoint for creating a new user:

```
POST /api/users/create
```

Which expects the following payload:

```json
{
  "email": "someuser@hacksoft.io"
}
```

And returns a simple `200 OK` response:

```json
{
  "token": "aa0d49a2ea8b4b0eae6f3deabdc37efe"
}
```

This token is going to be used to authenticate the user for any further actions.

In case the given user already exists, or the email is not properly formatted, return `400 Bad Request` with an error message:

```json
{
  "error": "Some error message here"
}
```

### Repositories

1. We're going to work with "Repository" objects.
1. We need a way to add "Repository" objects and link them to a specific "User".
1. We need to update those "Repository" objects on a daily basis, so we can have the traffic data stored, for periods longer than 14 days and show it later.

#### Authentication

1. Each of the APIs must be authenticated via the `token`, that's returned upon user creation.
1. The token must be passed as a special `X-API-Token` header in every request.

#### Create

Expose the following API:

```
POST /api/repos/create
```

Which expects the following payload:

```json
{
  "url": "https://github.com/HackSoftware/Django-Styleguide"
}
```

And returns a simple `200 OK` response:

```json
{
  "id": "some_internal_repository_id_here"
}
```

Return `400 Bad Request` if the url is not properly formatted:

```json
{
  "error": "Some error message here"
}
```

#### List

Expose the following API:

```
GET /api/repos
```

Which returns the following data for the authenticated user:

```javascript
[
  {
    "id": "some_internal_repository_id_here",
    "url": "https://github.com/HackSoftware/Django-Styleguide",
    "created_at": "some_timestamp_or_datetime_formatted_string_here"
  },
  // ... more objects here ...
]
```

*This API requires no pagination or filtering.*

#### Detail

Expose the following API:

```
GET /api/repos/<repository_id>
```

Which returns the following data for the authenticated user:

```javascript
{
  "id": "some_internal_repository_id_here",
  "url": "https://github.com/HackSoftware/Django-Styleguide",
  "created_at": "some_timestamp_or_datetime_formatted_string_here",
  "traffic": [
    // all the traffic data that you are storing 
  ]
}
```

#### Delete

Expose the following API:

```
POST /api/repos/<repository_id>/delete
```

Which deletes the given repository (only if this repository belongs to the authenticated user) and returns `202 Accepted` on success and `400 Bad Request` on failure.

This should delete all associated data with that repository.

## View Requirements

### Single user repository

Expose a simple Django view on the following url:

```
/users/<user_token>/repos/<repository_id>
```

Which renders a chart of all the data that we have available for that repository.

Few important things:

1. Do check if the given `user_token` corresponds with the given `repository_id`
1. How you are going to render the chart is entirely up to you.
1. This is not an authenticated view.

### All user repositories

Expose a simple Django view on the following url:

```
/users/<user_token>/repos
```

Which renders a chart per repository, for all repositories of the given user.

Few important things:

1. How you are going to render the chart is entirely up to you.
1. This is not an authenticated view.

### Filters

Both of the views above should support the following GET parameters:

```
?start=2020-01-01&end=2020-01-31
```

1. This should limit the traffic data to be `>= start` and `<= end`.
1. You can pass only `start`, `end` or both `start` and `end`.
1. The format is `YYYY-MM-DD`.
1. If no filters are passed, show all the data for the given repository.
