interface BlogMeta {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
}

interface BlogInfo {
    meta: BlogMeta;
    content: string;
}

export type {
    BlogMeta,BlogInfo
};