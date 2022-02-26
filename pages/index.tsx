import styles from '../styles/Home.module.css';
import Card from '../widgets/card';
import fs from 'fs';
import matter from 'gray-matter';
import { BlogMeta } from '../protocols/blog';
import { FunctionComponent } from 'react';
import Footer from '../widgets/footer';
import { NodeNextRequest } from 'next/dist/server/base-http/node';

interface HomeProps {
  blogs: BlogMeta[];
}

const Home: FunctionComponent<HomeProps> = ({ blogs }) => (
  <div style={{display: "flex", flexDirection: "column"}}>
    <div className={styles.container}>
    {
      blogs.map((blog,i) => (
        <Card key={i} blog={blog} />
      ))
    }
    </div>
    <div style={{marginTop: "20px"}}>
    <Footer/>
    </div>
  </div>
);


export async function getStaticProps() {
  const files = fs.readdirSync('blogs');
  const blogs = files.map(file => {
    const data = fs.readFileSync(`blogs/${file}`).toString();
    return {
      ...matter(data).data,
      slug: file.split('.')[0]
    };
  });
  return {
    props: {
      blogs
    }
  };
}

export default Home;