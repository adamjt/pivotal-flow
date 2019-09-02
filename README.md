# pivotal-flow

Automate your pivotal workflow

## Install

`npm install -D pivotal-flow`

can be installed globally as well

`npm install -g pivotal-flow`

### Usage

pivotal-flow contains two commands to automate your workflow

1. `pivotal-flow-start`
2. `pivotal-flow-check`

`pivotal-flow-start` walk you through story creation flow
`pivotal-flow-check` can be used to check if the newly created branch contains the story id. This works
best as a `post-checkout` git hook.
