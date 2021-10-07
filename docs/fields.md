# Fields

## Job Formular Fields

| Name                        | Value                              |
|-----------------------------|------------------------------------|
| jobtitle                    | Title of the joboffer              |
| joblocation                 | Location of the Joboffer           |

## Enviroment

all environmet variales are located in a `.env` file. This file is versioned in git.
You can overwrite values by creating a `.env.local` oder `.dev.production` file.

`.env.*` is listed in `.gitignore`

| Name                         | Value                               | 
|------------------------------|-------------------------------------|
| YAWIK_URL_HOME               | Startpage of the                    |
| YAWIK_URL_IMPRINT            | Link to Imprint                     |
| YAWIK_URL_OPERATOR           | Link to Operator                    |
| YAWIK_URL_PRIVACY            | Link to the Privacy notes           |
| YAWIK_APP_KEY                | Shared App Key                      |
| YAWIK_API_URL                | Yawik API                           |  
| YAWIK_SSO_URL                | Keycloak base URL                   |  
| YAWIK_SSO_REALM              | Keycloak realm                      |  
| YAWIK_SSO_CLIENT             | Keycloak application ID             | 
| YAWIK_GOOGLE_MAPS            | Google Maps API Key                 |

