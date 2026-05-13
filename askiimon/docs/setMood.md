<h1 class="hljs-title function">setMood</h1>

- moodName
    (<span class="hljs-type hljs-error">required</span>)<br>
    <div class="hljs-type">string</div>

## Usage:

```javascript
import askiimon from "askiimon";

const mon = askiimon.init({
    mood: "ohh!",
    message: ""
});

mon.setMood("sad");
```