const output = document.querySelector('output')
const button = document.querySelector('get-posts-btn')


async function showPosts() {
   try {
     const res = await fetch('http://localhost:3000/apis/posts')
    if(!res.ok){
        throw new Error('Failed to Fetch posts')
    }

    const posts = await res.json()
    output.innerHTML = ''

    posts.array.forEach(post => {
        const postEl = document.createElement('div')
        postEl.textContent = post.title
        output.appendChild(postEl)
    });
   } catch (error) {
        console.log('Error Fetching posts : ',error)
   }
}

//Event Listener
button.addEventListener('click',showPosts)