# Fields

## Job Formular Fields



| Name                    | Value                                                   |
|-------------------------|---------------------------------------------------------|
| acceptTerms             | accept Terms and Condition                              |
| applyEmail              | email Address for Applications                          |
| applyPost               | Link to an Application Form                             |
| applyURL                | no online application                                   |
| contactInfo             | Contact where to apply                                  |
| contactInfoLabel        | Label of the Contact Textarea                           |
| country                 | Country                                                 |
| intro                   | Company description                                     |
| introLabel              | Label of the Company description Textarea               |
| jobTitle                | The title of the job (not the title of the posting)     |
| location                | The physical location(s) of the business                |
| offer                   | Benefits                                                |
| offerLabel              | Label of the Benefits TextArea                          |
| organization            | The organization offering the job position.             |
| profile                 | Requirements for the jobposting. Textarea               |
| profileLabel            | Label of the Requirements Textarea                      |
| reference               | The hiring organization's unique identifier for the job.|
| salary                  | salary used in JSON-LD and if visibly with the jobad    |
| salaryVisibility        | if false, salary is not displayed in the jobad          |
| step                    | current step of the wizard                              |
| taskLabel               | Label of the Task Textarea Field                        |
| tasks                   | Task                                                    |
| workDuration            | FULL_TIME, PART_TIME                                    |
| workKind                | Type of employment.                                     |


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
