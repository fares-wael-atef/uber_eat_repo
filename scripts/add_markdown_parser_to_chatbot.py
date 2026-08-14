#!/usr/bin/env python3
"""
add_markdown_parser_to_chatbot.py —
Parses markdown tags (**bold**, ### headers, - lists) into real HTML strong tags, headings, and lists
inside js/chatbot.js.
"""

def add_parser():
    bot_path = "/Users/mac/Downloads/AliBaba_Dashboard/js/chatbot.js"
    with open(bot_path) as f:
        code = f.read()

    markdown_func = """  function parseMarkdown(text) {
    if (!text) return '';
    let html = text;

    // 1. Convert markdown headers (### Header)
    html = html.replace(/^### (.*$)/gim, '<h4 style="margin:12px 0 6px 0; font-size:0.96rem; font-weight:800; color:var(--blue-600, #2563eb);">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 style="margin:14px 0 8px 0; font-size:1.02rem; font-weight:800; color:var(--text-primary);">$1</h3>');

    // 2. Convert bold text (**text** or __text__) to real <strong> elements
    html = html.replace(/\\*\\*(.*?)\\*\\*/g, '<strong style="font-weight:700; color:var(--text-primary);">$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong style="font-weight:700; color:var(--text-primary);">$1</strong>');

    // 3. Convert italic text (*text* or _text_)
    html = html.replace(/\\*(.*?)\\*/g, '<em>$1</em>');

    // 4. Convert bullet list lines (- Item)
    html = html.replace(/^\\- (.*$)/gim, '<li style="margin-left:16px; margin-bottom:3px; list-style-type:disc;">$1</li>');

    // 5. Convert newlines to <br>
    html = html.replace(/\\n/g, '<br>');

    return html;
  }"""

    # Replace renderAllMessages item.content string manipulation
    code = code.replace(
        "const formatted = item.content.replace(/\\n/g, '<br>');",
        "const formatted = parseMarkdown(item.content);"
    )

    # Replace appendMessage text string manipulation
    code = code.replace(
        "div.innerHTML = `<div class=\"msg-bubble\">${text.replace(/\\n/g, '<br>')}</div>`;",
        "div.innerHTML = `<div class=\"msg-bubble\">${parseMarkdown(text)}</div>`;"
    )

    # Insert parseMarkdown function into ChatbotManager module if missing
    if "function parseMarkdown" not in code:
        code = code.replace(
            "function getSystemPrompt() {",
            markdown_func + "\n\n  function getSystemPrompt() {"
        )

    with open(bot_path, "w") as f:
        f.write(code)
    print("[SUCCESS] Added Markdown parser to js/chatbot.js for bold and headers rendering")

if __name__ == "__main__":
    add_parser()
