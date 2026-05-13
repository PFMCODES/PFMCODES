<h1 class="hljs-title function">setShowWarnings</h1>

- boolean
    (<span class="hljs-type hljs-error">required</span>)<br>
    <span class="hljs-type hljs-boolean">boolean</span>,<br>
    <span class="hljs-title function">default</span>: <span class="hljs-type hljs-boolean">true</span>

## Usage:

```javascript
import askiimon from "askiimon";

const mon = askiimon.init({
    mood: "ohh!",
    message: ""
});

mon.setShowWarnings(true); // can be used to hide or show warnings & error message
```