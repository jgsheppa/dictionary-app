## The Site

WordDivan is an online dictionary which uses the `Yandex Dictionary API` to populate the sites dictionary entries.

One unique aspect about WordDivan is its utilization of information about Russian verbs. In Russian, each verb has a
`perfective` and an `imperfective` form, for instance `говорить` (to speak) and `поговорить` (to speak for a short amount of time).
These two forms are known as a verb's aspect.

The Yandex translation site and other online dictionaries contain little to no information about a given verb's aspect.
However, the Yandex API includes information about each verb's aspect, and WordDivan uses this information to clearly mark
verbs - `yellow` for `imperfective` and `blue` for `perfective`. See below for an example.

![verb aspect screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/verb-aspect-screenshot.png)

![profile screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/profile_screenshot.png)

## Testing

![cypress screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/cypress_screenshot.png)
