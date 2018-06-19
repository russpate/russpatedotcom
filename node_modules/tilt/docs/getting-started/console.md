# Using the Tilt console

## Launching the console

The Tilt console is a development console based on Vorpal that allows you to manage a Tilt application’s complete development cycle.

To launch the Tilt console, change to the directory of your project, and run tilt:

```bash
$ cd my-tilt-app
$ tilt
```

[[images/console.png]]

## Getting help

Use the `help` command to get basic help about the available commands.  You can
also use this with a specific command to get information about that command:

```bash
[my-tilt-app] $ help run
```

## Running the server in development mode

To run the current application in development mode, use the `run` command:

```bash
[my-tilt-app] $ run
```

[[images/consoleRun.png]]

In this mode, the server will be launched with the auto-reload feature enabled,
meaning that for each request Tilt will check your project and recompile
required sources. If needed the application will restart automatically.

If there are any compilation errors you will see the result of the compilation
directly in your browser:

[[images/errorPage.png]]

To stop the server, type `Crtl+D` key, and you will be returned to the Tilt
console prompt.

## Compiling

In Tilt you can also compile your application without running the server. Just
use the `compile` command:

```bash
[my-tilt-app] $ compile
```

[[images/consoleCompile.png]]

## Running the tests

Like the commands above, you can run your tests without running the server.
Just use the `test` command:

```bash
[my-tilt-app] $ test
```

## Launch the interactive console

Type `console` to enter the interactive REPL console, which allows you to test your code interactively:

```bash
[my-tilt-app] $ console
```

## Using the tilt commands directly

You can also run commands directly without entering the Tilt console. For example, enter `tilt run`:

```bash
$ tilt run
[info] tilt - Listening for HTTP on localhost:3000
```
