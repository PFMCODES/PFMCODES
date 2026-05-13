<h1 class="hljs-title function">setIntervals</h1>

- boolean
    (<span class="hljs-type hljs-error">required</span>)<br>
    <span class="hljs-type hljs-boolean">boolean</span>,<br>
    <span class="hljs-title function">default</span>: <span class="hljs-type hljs-boolean">true</span>
- interval_timing
    (<span class="hljs-type hljs-error">required</span>)<br>
    <span class="hljs-type hljs-boolean">number</span>,<br>
    <span class="hljs-title function">default</span>: <span class="hljs-type hljs-number">2000</span>

## Usage:

```javascript
import askiimon from "askiimon";

const mon = askiimon.init({
    mood: "ohh!",
    message: ""
});

mon.setIntervals(true, 5000); // can be used to add/remove intervals between setMessage, & setMood
//           the time is measured in miliseconds
```