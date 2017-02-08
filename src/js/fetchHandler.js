
const domain = 'https://api.github.com';

export async function getBlogs() {
  return await fetch(`${domain}/repos/abs1118/abs1118.github.io/issues?fliter=created&page=1&per_page=10000`, {
      // credentials: 'include',
      // mode: "cors",
      // method: 'get'
    })
    .then(
        res => res.json()
    );
}

export async function getBlog(number) {
    return await fetch(`${domain}/repos/abs1118/abs1118.github.io/issues/${number}?fliter=created&per_page=10000`, {
        // credentials: 'include',
        // mode: "cors",
        // method: 'get'
    })
        .then(
            res => res.json()
        );
}

