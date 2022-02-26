import Link from "next/link";
import { FunctionComponent } from "react";
import { BlogMeta } from "../protocols/blog";
import styles from "../styles/card.module.css";

interface CardProps {
    blog: BlogMeta;
}

const Card: FunctionComponent<CardProps> = ({ blog }) => (
    <Link href={`/blog/${blog.slug}`}>
        <div className={styles.card}>
            <img src={blog.thumbnail} alt={blog.title} />
            <div className={styles.info}>
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
            </div>
        </div>
    </Link>
);

export default Card;