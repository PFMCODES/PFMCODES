<h1 class="hljs-title function">learnMood</h1>

- moodName
    (<span class="hljs-type hljs-error">required</span>)<br>
    <div class="hljs-type">string</div>

- mood
    (<span class="hljs-type hljs-error">required</span>)<br>
    <div class="hljs-type">string</div>

## Usage:

```javascript
import askiimon from "askiimon";

const mon = askiimon.init({
    mood: "ohh!",
    message: ""
});

mon.learnMood("cat", "ฅ^•ﻌ•^ฅ");
```