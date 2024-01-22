// how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    console.log(date);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }

    if (seconds < 10) {
        return "just now";
    }

    return Math.floor(seconds) + " seconds ago";
}

//? defined commenters
const users = {
    'alex1': {
        name: 'Alex Cooper',
        src: '/assets/alex.jpg'
    },
    'anna1': {
        name: 'Anna Smith',
        src: '/assets/anna.jpg'
    },
    'drew1': {
        name: 'Drew Parker',
        src: '/assets/drew.jpg'
    },
    'liliya': {
        name: 'Liliya Nováková',
        src: '/assets/liliya.jpg'
    },
};

//? currently logged user
const loggedUser = users['alex1'];

//? defined comments
let comments = [
    {
        id: 1,
        text: 'I am on it, will get back to you at the end of the week &#128526.',
        author: users['liliya'],
        createdAt: '2023-09-03 12:00:00',
    },
    {
        id: 2,
        text: `I will prepare Instagram strategy, Liliya will take care about Facebook.hello how are you all i am here to present new plan
        hello good morning`,
        author: users['anna1'],
        createdAt: '2023-09-03 11:00:00',
    },
    {
        id: 3,
        text: 'I would love to get on that marketing campaign &#128522;. What are the next steps?',
        author: users['drew1'],
        createdAt: '2023-09-02 10:00:00',
    },
];

const authedUser = document.querySelector('.authed-user');

const authorHTML = DOMPurify.sanitize(`<img class="avatar" src="${loggedUser.src}" alt="${loggedUser.name}">`);

authedUser.innerHTML = authorHTML;

const commentsWrapper = document.querySelector('.discussion__comments');

//? generate comment HTML based on comment object
const createComment = (comment) => {
    const newDate = new Date(comment.createdAt);
    // sanitize comment HTML
    return DOMPurify.sanitize(`<div class="comment">
        <div class="avatar">
            <img
                class="avatar"
                src="${comment.author.src}"
                alt="${comment.author.name}"
            >
        </div>
        <div class="comment__body">
            <div class="comment__author">
                ${comment.author.name}
                <time
                    datetime="${comment.createdAt}"
                    class="comment__date"
                >
                    ${timeSince(newDate)}
                </time>
            </div>
            <div class="comment__text" style="white-space: pre-line;">
                <p>${comment.text}</p>
            </div>
        </div>
    </div>`);
}


//? prepare comments to be written to DOM
const commentsMapped = comments.map(comment =>
    createComment(comment)
);
console.warn(commentsMapped);
//? write comments to DOM
const innerComments = commentsMapped.join('');
commentsWrapper.innerHTML = innerComments;

const newCommentForm = document.getElementById('newcomment__form');
const newCommentTextarea = document.querySelector('#newcomment__form textarea');

document.getElementById('reset-button').addEventListener(
    'click',
    () => {
        newCommentForm.reset();
    }
);

newCommentForm.addEventListener(
    'submit',
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newCommentTextareaValue = newCommentTextarea.value;

        const newComment = {
            id: comments.length + 1,
            text: newCommentTextareaValue,
            author: loggedUser,
            createdAt: new Date().toISOString(),
        };

        const comment = document.createElement('div');
        comment.innerHTML = createComment(newComment);

        if (commentsWrapper.hasChildNodes()) {
            commentsWrapper.insertBefore(comment, commentsWrapper.childNodes[0]);
        } else {
            commentsWrapper.appendChild(comment);
        }

        //? reset form after submit
        newCommentForm.reset();
    }
);

document.addEventListener("DOMContentLoaded", function () {
    const earth = document.querySelector(".object_earth");
    const discussion = document.querySelector(".discussion");

    function orbitEarth() {
        const discussionRect = discussion.getBoundingClientRect();
        const centerX = discussionRect.left + discussionRect.width / 2;
        const centerY = discussionRect.top + discussionRect.height / 2;

        const angle = performance.now() / 1000; // Adjust speed here
        //   console.log(angle)
        const radius = 100; // Adjust orbit radius here

        const x = centerX + radius * Math.cos(angle);
        //   console.log(x)
        const y = centerY + radius * Math.sin(angle);
        //   console.log(y)

        earth.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(orbitEarth);
    }

    orbitEarth();
});