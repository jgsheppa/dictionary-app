## The Site

WordDivan is an online dictionary which uses the `Yandex Dictionary API` to populate the sites dictionary entries.

One unique aspect about WordDivan is its utilization of information about Russian verbs. In Russian, each verb has a
`perfective` and an `imperfective` form, for instance `говорить` (to speak) and `поговорить` (to speak for a short amount of time).
These two forms are known as a verb's aspect.

The Yandex translation site and other online dictionaries contain little to no information about a given verb's aspect.
However, the Yandex API includes information about each verb's aspect, and WordDivan uses this information to clearly mark
verbs - `yellow` for `imperfective` and `blue` for `perfective`. See below for an example.

![verb aspect screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/verb-aspect-screenshot.png)

WordDivan's main purpose is to serve as a language learning tool, which allows users to look up words, as well as save them
to vocabulary lists. These lists can only be made if a user creates a profile.

After registration, users can begin to create vocabulary lists and view them on their profile page.

![profile screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/profile_screenshot.png)

The user can then click on a specific list and view the words saved in it. Below is an example of a list called 'animals.'

![profile screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/vocab-list-page-screenshot.png)

#### Creating Your Lists

You can create and add words to your lists on each dictionary entry page.

![cypress screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/create-list-ex.gif)

## Testing

This project uses `Cypress` to run E2E tests.

![cypress screenshot](https://github.com/jgsheppa/dictionary-app/blob/master/public/cypress_test.gif)
