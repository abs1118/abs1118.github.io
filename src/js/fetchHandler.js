
const domain = '`https://api.github.com';

export async function getBlogs() {
  return await fetch(`${domain}/repos/abs1118/abs1118.github.io/issues`, {
      credentials: 'include',
      method: 'post'
    })
    .then(res => res.json());
}

