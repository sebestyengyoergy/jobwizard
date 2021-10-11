# Fields

## Job Formular Fields



| Name                    | Value                              |
|-------------------------|------------------------------------|
| acceptTerms             ||
| applyEmail              ||
| applyPost               ||
| applyURL                ||
| contactInfo             ||
| contactInfoLabel        ||
| country                 || Country
| intro                   ||
| introLabel              ||
| jobTitle                | The title of the job (not the title of the posting)|
| location                | The physical location(s) of the business           |
| offer                   ||
| offerLabel              ||
| organization            | The organization offering the job position. |
| profile                 ||
| profileLabel            ||
| reference               | The hiring organization's unique identifier for the job.|
| salary                  ||
| salaryVisibility        ||
| step                    ||
| taskLabel               ||
| tasks                   ||
| workDuration            || FULL_TIME, PART_TIME                                   |
| workKind                || Type of employment.                                    |


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
| YAWIK_ROUTER_BASE            | Vue Router Base                     |  
| YAWIK_SSO_URL                | Keycloak base URL                   |  
| YAWIK_SSO_REALM              | Keycloak realm                      |  
| YAWIK_SSO_CLIENT             | Keycloak application ID             | 
| YAWIK_GOOGLE_MAPS            | Google Maps API Key                 |
