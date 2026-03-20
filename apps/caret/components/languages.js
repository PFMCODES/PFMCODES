import javascript from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/javascript.js";
import xml from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/xml.js";
import css from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/css.js";
import python from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/python.js";
import java from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/java.js";
import csharp from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/csharp.js";
import cpp from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/cpp.js";
import ruby from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/ruby.js";
import php from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/php.js";
import go from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/go.js";
import c from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/c.js";
import rust from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/rust.js";
import kotlin from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/kotlin.js";
import swift from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/swift.js";
import typescript from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/typescript.js";
import json from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/json.js";
import bash from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/bash.js";
import plaintext from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/plaintext.js";
import hljs from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/core.js";

let registeredLanguages = [];

function init() {
    // Register all languages
    registerLanguage("javascript", javascript);
    registerLanguage("xml", xml);
    registerLanguage("typescript", typescript);
    registerAliases(["jsx"], { languageName: "javascript" });
    registerAliases(["js"], { languageName: "javascript" });
    registerAliases(["ts"], { languageName: "typescript" });
    registerAliases(["html"], { languageName: "xml" });
    registerAliases(["svg"], { languageName: "xml" });
    registerLanguage("css", css);
    registerLanguage("python", python);
    registerLanguage("java", java);
    registerLanguage("csharp", csharp);
    registerLanguage("cpp", cpp);
    registerLanguage("ruby", ruby);
    registerLanguage("php", php);
    registerLanguage("go", go);
    registerLanguage("c", c);
    registerLanguage("rust", rust);
    registerLanguage("kotlin", kotlin);
    registerLanguage("swift", swift);
    registerLanguage("json", json);
    registerLanguage("bash", bash);
    registerLanguage("shell", bash);
    registerLanguage("sh", bash);
    registerLanguage("plaintext", plaintext);
    registeredLanguages.push(
        "javascript", "js",
        "xml", "html", "svg",
        "css",
        "python",
        "java",
        "csharp",
        "cpp",
        "ruby",
        "php",
        "go",
        "c",
        "rust",
        "kotlin",
        "swift",
        "typescript",
        "json",
        "bash", "shell", "sh",
        "plaintext"
    );
}

export function registerAliases(a, b) {
    hljs.registerAliases(a, b)
}

function registerLanguage(name, definition) {
    if (!registeredLanguages.includes(name)) {
        hljs.registerLanguage(name, definition);
        registeredLanguages.push(name);
        return;
    } else {
        console.warn(`Caret: Language ${name} already registered, aborting`);
        return;
    }
}

const languages = {
    init,
    registeredLanguages,
    registerLanguage,
    registerAliases,
    hljs
}

export default languages;

/* 
registeredLannguage: added for the editor.js can check if the langauge provided already is regsitered or not
init: just registers some languages and updates the registeredLangauges variable
registerLanguage: just registers a language
registerAliases: basically registers a nickname or second name for an language
*/