# Installing Tilt

This page shows how to download, install and run a tilt application.

## Prerequisites

Tilt requires node v4 or higher. To check that you have the latest node, please run:

```bash
node -v
```

If you don't have nodejs, you have to install it from [nodejs site](http://nodejs.org)

## Installing Tilt

tilt is an npm package, so you can install it using npm:

    npm i tilt --save

## Create a Project

Tilt comes with a couple of different "templates" that can be used to start off
a tilt project.  You can create a project directly using a web interface, or
from the command line.

Open a command prompt, and type `npm run tilt` to bring up the GUI interface.
A browser window will open with the Web UI at
[http://localhost:8888](http://localhost:8888).

Follow the arrows to create a new project:

[[images/webTemplate.png]]

You can init a project direclty from command line using `npm run tilt init`.

[[images/cliemplate.png]]

## Running Tilt

Tilt has an easy to use "development mode" that will let you make changes to
code and see your results immediate on the page.

You can run Tilt in development mode with `npm start`.

This will bring up the Tilt application at
[http://localhost:3000](http://localhost:3000).

## Congratulations!

You are now ready to tilt with Tilt! The next page will show you how to create
projects from the command line and some more detail about creating new
applications.
