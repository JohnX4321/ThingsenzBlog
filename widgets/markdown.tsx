import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { FunctionComponent } from "react";

interface MarkdownProps {
    content: string;
}

const Markdown: FunctionComponent<MarkdownProps> = ({ content }) => {
    return <div className="markdown-body">
        <ReactMarkdown children={content} components={{
                code({node,inline,className,children,...props}) {
                    const match = /language-(\w+)/.exec(className||'');
                    return (!inline&&match)? (
                        <SyntaxHighlighter style={materialLight} PreTag="div" language={match[1]} children={String(children).replace(/\n$/,'')} {...props} />
                    ): (
                        <code className={className ? className:""} {...props}>
                        {children}
                        </code>
                    )
                }
        }}  />
    </div>
}

export default Markdown;