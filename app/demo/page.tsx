"use client";
import React, { LegacyRef } from "react";
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

<iframe src="./" width="100%" height="500"></iframe>

### external link

[external link](/link)

### special link

[special link](./agent/special)

`;

  return (
    <div className="markdown-body px-8 py-16">
      {/* 将 Markdown 内容包裹在 div.markdown-body 中,以避免与 Tailwind CSS 样式冲突 */}
      <Markdown
        rehypePlugins={[rehypeRaw, remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ref, style, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                style={style as { [key: string]: React.CSSProperties }}
                ref={ref as LegacyRef<SyntaxHighlighter>}
                PreTag="div"
                language={match[1]}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          a(props) {
            const { href, children } = props;
            if (href && href.indexOf("/agent/special") != -1) {
              return (
                <iframe src={href} width="100%" height="500" allowFullScreen />
              );
            }
            // 否则,渲染为普通的 <a> 链接
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          a(props) {
            const { href, children } = props;
            if (href && href.indexOf("/agent/special") != -1) {
              return (
                <iframe src={href} width="100%" height="500" allowFullScreen />
              );
            }
            // 否则,渲染为普通的 <a> 链接
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
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
