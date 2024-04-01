"use client";
import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css"; // 引入 github-markdown-css

const DemoPage = () => {
  const markdownContent = `
# Markdown Test Content

## Heading

This is a regular paragraph with some **bold text** and _italic text_. Also, here's a [link](https://example.com).

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- Item 1
- Item 2
- Item 3

### Code Block

\`\`\`javascript
const sayHello = () => {
  console.log('Hello, World!');
}

sayHello();
\`\`\`

### Blockquote

> This is a blockquote. You can include multiple paragraphs or other Markdown elements inside a blockquote.
>
> - Unordered list item
> - Another item

### Horizontal Rule

---

### Image

![Alt Text](https://via.placeholder.com/150)

### Iframe

<iframe src="http://localhost:3000" width="100%" height="500"></iframe>
`;

  return (
    <div className="markdown-body">
      {/* 将 Markdown 内容包裹在 div.markdown-body 中,以避免与 Tailwind CSS 样式冲突 */}
      <Markdown
        rehypePlugins={[rehypeRaw, remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter {...rest} PreTag="div" language={match[1]}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </Markdown>
    </div>
  );
};

export default DemoPage;
