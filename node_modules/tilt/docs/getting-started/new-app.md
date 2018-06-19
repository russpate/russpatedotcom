# Creating a new application

Tilt provides a CLI tool to interact with your application. The `tilt` command
can be found in `./node_modules/.bin/tilt` or globally installed using:

    npm i tilt-cli -g

## Create a new application with the tilt command

The `tilt` command can be used to create a new Tilt application.
Tilt allows you to select a template that your new application should be
based off.

To create a new basic Tilt application, run:

```bash
$ tilt new tilt-app
```

To create the application in another directory, run:

```bash
$ tilt new tilt-app my-first-app
```

You can replace `my-first-app` with whatever name you want your application to
use. Tilt will use this as the directory name to create the application
in.

[[images/tiltNew.png]]

> If you wish to use other Tilt templates, you can do this by running `tilt new`. This will prompt you for an application name, and then give you a chance to browse and select an appropriate template.

Once the application has been created you can use the `tilt` command again to enter the [[Tilt console|TiltConsole]].

```bash
$ cd my-first-app
$ tilt
```

`tilt new` uses Yeoman if it is installed on your system, allowing you to bring in Yeoman generators in `tilt new`.

## Create a new application with the Tilt UI

New Tilt applications can also be created with the Tilt UI. To use the Tilt UI, run:

```bash
$ tilt ui
```
