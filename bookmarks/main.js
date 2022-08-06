document.getElementById("myForm").addEventListener("submit", saveSiteBookmarks);
$(fetchBookmarks);
function saveSiteBookmarks(e) {
  const siteName = document.getElementById("site-name").value;
  const siteUrl = document.getElementById("site-url").value;

  if(!siteName || !siteUrl) {
      alert("Please fill in the form");
      return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
      alert("Is not url!");
      return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  //local storage
  if (localStorage.getItem("bookmarks") === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  fetchBookmarks();

  alert("Bookmark save successfully");

  e.preventDefault();
}

function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  const result = document.getElementById("bookmark-result");
  result.innerHTML = "";
  bookmarks.forEach(bookmark => {
    result.innerHTML += 
    '<div class="jumbotron">' +
    '<a href="' + bookmark.url + '">' + bookmark.name + "</a>" +
    '<a class="btn btn-danger float-right" onclick="deleteBookmark(\'' + bookmark.url.trim() + '\')">Delete</a>' +
    '<a class="btn btn-primary float-right" onclick="viewBookmark(\'' + bookmark.url.trim() + '\')">View</a>' +
    "</div>";
    
  });
}
function viewBookmark(url){

}
const deleteBookmark = function(url) {
  console.log(url);
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.url === url) {
      bookmarks.splice(index, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}
