/* 
    Вывести на странице 5 постов с ресурса 
    http://jsonplaceholder.typicode.com/posts?_start=8&_limit=5

    В произвольной форме вывести 
    - заголовок поста
   - ссылку на автора этого поста
      <span class="author-link">Get author</span> 

    При клике на ссылку "Get author" выполнить запрос на сервер 
    https://jsonplaceholder.typicode.com/users/<ID_автора>
    https://jsonplaceholder.typicode.com/posts?userId=1
     - name, username, email
     - количество постов этого user      

    */

const posts = document.getElementById("posts");

posts.innerHTML = "<h1>Todo here</h1>";

const url = 'http://jsonplaceholder.typicode.com/posts?_start=8&_limit=5'
const url_id = 'https://jsonplaceholder.typicode.com/users/'
const url_post = 'https://jsonplaceholder.typicode.com/posts?userId='

function fetchUser(id) {
  const name = fetch(url_id + id).then(r => r.json())
  const post = fetch(url_post + id).then(r => r.json())
  return Promise.all([name, post]);
}

function render(data) {
  posts.innerHTML = data.map(item => `<h3>${item.title}<span class="author-link" data-user-id="${item.userId}"> Get author</span></h3>`).join('');
}

function renderUser(data) {
  data[2].innerHTML = ` name: ${data[0].name} username: ${data[0].username} email: ${data[0].email} posts:${data[1].length}`
  // console.log(data)
}

function handleClick(e) {
  const { target } = e;
  if (target.classList != 'author-link') return;
  fetchUser(target.dataset.userId)
    .then(data => [...data, target])
    .then(renderUser)
    .catch(error => console.log('Request failed', error));
}

document.addEventListener('click', handleClick);

fetch(url)
  .then(r => r.json())
  .then(render)
  .catch(error => console.log('Request failed', error));
