<h1 class="hljs-title function">Init</h1>

- Object
    - state(starting mood)
    <br>
    <span class="hljs-type- hljs-type">string</span>,<br>
    <span class="hljs-title function">default</span>: <span class="hljs-type hljs-string">"idle"</span>
    - starting message
    <br>
    <span class="hljs-type- hljs-type">string</span>,<br>
    <span class="hljs-title function">default</span>: <span class="hljs-type hljs-string">""</span>


> this same function can be called as "birth" & "create"

## Usage:

```javascript
import askiimon from "askiimon";

const mon = askiimon.init({
    mood: "ohh!",
    message: ""
});
```