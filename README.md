# Wizard for entering job ad

Standalone wizard based on [quasar](https://quasar.dev/). It is a single page application (SPA) running in the  clients browser. The result is a static HTML content. 

As an authenticated user it's possible to save the job.

![JobWizard](./docs/jobwizard-animated.gif)

## Task description

https://gitlab.com/yawik/rewrite/-/issues/1

## Status

In development.

## Requirements

- [nodesjs](https://nodejs.org/)
- [yarn](https://yarnpkg.com/) (recommended)

## Installation

```
git clone https://gitlab.com/yawik/jobwizard.git
cd jobwizard
yarn
yarn dev
```

## Configuration

The form is .env-aware.  

| Name                         | Value                               | 
|------------------------------|-------------------------------------|
| YAWIK_URL_PRIVACY            | Link to the Privacy notes           |
| YAWIK_APP_KEY                | Shared App Key                      |
| YAWIK_API_URL                | Yawik API                           |
| YAWIK_ROUTER_BASE            | Router Base of the web app          |
| YAWIK_SSO_URL                | Keycloak base URL                   |  
| YAWIK_SSO_REALM              | Keycloak realm                      |  
| YAWIK_SSO_CLIENT             | Keycloak application ID             |  

It's possible to show a toolbar with the Logo and a navigation drawer by using query parameter with any non-empty value.

| Param        | Description       |
|--------------|-------------------|
| tb           | hide toolbar      |  

## Demo

https://jobwizard.yawik.org/

## Documentation

we use mkdocs dor documentation. Rendered version is located at:

https://jobwizard.yawik.org/docs/

