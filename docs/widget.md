# Widget

With the Jobboard Widget you can integrate the Jobwizard into your own homepage. All you have to do is load a Javascript and set an HTML tag. The widget loads job ads via the [Yawik API](https://api.yawik.org/documentation) 
and renders a table.

Example

``` html
<link rel="stylesheet" href="https://yawik.gitlab.io/jobboard-widget/yawik-job-list.css"/>
<script src="https://yawik.gitlab.io/jobboard-widget/yawik-job-list.js"></script>
<yawik-job-list remote="https://api.yawik.org/api/jobs"></yawik-job-list>
```

If you insert the HTML snippet into your HTML page, you will see the job list that you find in the 
[jobwizard jobboard](https://jobwizard.yawik.org/de/jobboard).

<yawik-job-list remote="https://api.yawik.org/api/jobs"></yawik-job-list>

## Available attributes

| Attribute   | Description                                                                      |
| ----------- | -------------------------------------------------------------------------------- |
|remote	      | URL to the yawik jobwizard backend. e.g. https://api/yawik.org/api/jobs          |
|count	      | Amount of jobs displayed at once.                                                |
|widget-title | Headline displayed above the jobs (default: YAWIK Job List)                      |
|org	      | ID of an organization. If given, only jobs from this organization are displayed  |
|job-on-click |	default: “_blank”                                                                |
|hide-logo	  | default: “false. Hide logo of a company.                                         |

## Gitlab

https://gitlab.com/yawik/jobboard-widget