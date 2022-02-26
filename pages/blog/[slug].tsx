import { FunctionComponent } from "react";
import fs from 'fs';
import matter from "gray-matter";
import styles from '../../styles/blog.module.css';
import { BlogInfo } from "../../protocols/blog";
import Markdown from "../../widgets/markdown";

interface SlugProps {
    blog: BlogInfo;
}

const Blog: FunctionComponent<SlugProps> = ({ blog }) => (
    <div className={styles.blog}>
        <div className={styles.thumbnail}>
            <img src={blog.meta.thumbnail} alt={blog.meta.title} />
            <div className={styles.title}>
                <h1>{blog.meta.title}</h1>
            </div>
            <div className={styles.content}>
                <Markdown content={blog.content} />
            </div>
        </div>
    </div>
)

export async function getStaticProps({ ...ctx }) {
    const {slug} = ctx.params;
    const content= fs.readFileSync(`blogs/${slug}.md`).toString();
    const info = matter(content);
    const blog = {
        meta: {
            ...info.data,
            slug
        }, content: info.content
    }
    return {
        props: {
            blog: blog
        }
    };
}

export async function getStaticPaths() {
    const files = fs.readdirSync("blogs");
    const paths = files.map(file => ({
        params: {
            slug: file.split('.')[0]
        }
    }))
    return {
        paths,fallback: false
    }
}

export default Blog;