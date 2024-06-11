const paths = {
  homePage: () => `/`,
  topicShowPath: (slug: string) => `/topics/${slug}`,
  postCreate: (slug: string) => `/topics/${slug}/posts/new`,
  postShow: (topicSlug: string, postId: string) => `/topics/${topicSlug}/posts/${postId}`

}

export default paths;
