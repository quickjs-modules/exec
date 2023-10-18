# exec

The `exec` function is a small wrapper around `popen`.
It comes with an `Arguments` class that makes it easy to set options to commands.

```javascript
import exec from "./exec.js";

exec("echo hello world");
```

Using `Arguments` to set options:

```javascript
import exec, { Arguments } from "./exec.js";

const args = new Arguments();
args.add("extract");
args.add("file", "archive.tar");
args.add("directory", "/path/to/files");

exec(`tar ${args}`);
// tar --extract --file archive.tar --directory /path/to/files
```

There a few options to configure `Arguments`:

| Option    | Description                               | Default |
| --------- | ----------------------------------------- | ------- |
| delimiter | Character between an option and its value | `" "`   |
| prefix    | Character to prepend to every option      | `"--"`  |
