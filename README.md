## 如何实现在markdown中渲染iframe

demo展示地址：[Create Next App](https://markdown-preview-eosin.vercel.app/demo)

项目源代码：[GitHub - KazooTTT/markdown-iframe-preview](https://github.com/KazooTTT/markdown-iframe-preview/)

使用的markdown渲染器是：[GitHub - remarkjs/react-markdown: Markdown component for React](https://github.com/remarkjs/react-markdown)

![Pasted image 20240401193815](https://pictures.kazoottt.top/2024/04/20240401-99bfb1d8434e94e5b66182ed42bc09b7.png)

有两种方案，第一种是iframe以html的语法嵌入（1），第二种是重写a标签把它转化为iframe（3）。

## iframe直接嵌入markdown

``` markdown
### Iframe

  

<iframe src="./" width="100%" height="500"></iframe>
```

参考：

[iFrame Not Rendering · Issue #661 · remarkjs/react-markdown · GitHub](https://github.com/remarkjs/react-markdown/issues/661)

[GitHub - remarkjs/react-markdown: Markdown component for React](https://github.com/remarkjs/react-markdown?tab=readme-ov-file#appendix-a-html-in-markdown)

也就是引入rehypeRaw这个rehypePlugin，实现在markdown中嵌入html。

（谨慎使用，需要保证html内容安全的情况下嵌入）

``` typescript
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";


<Markdown rehypePlugins={[rehypeRaw]} >
	{markdownContent}
</Markdown>
```

## a标签转化为iframe

在某些情况下我们需要把a标签的对应的网页直接展示出来，这个时候就要把a标签转化为iframe了。实现的方法是重写a这个组件。

下面是我的写法，我需要把链接中有`/agent/special`的所有的链接都以iframe的形式展示出来。于是做了一个特殊判断来实现这个逻辑。对于其他的不满足要求的a标签，则直接渲染为a标签即可。

这里还可以做一些拓展的写法，比如检查到网易云的音乐链接，就在前面加一个网易云的logo，如果检测到外链那么点击的时候打开新的窗口等等。

``` typescript 
<Markdown components={{
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
	}
}}>
	{markdownContent}
</Markdown>

```
