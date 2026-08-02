const toggleButton = document.querySelector("#toggleButton");
const details = document.querySelector("#details");
const readMoreButton = document.querySelector("#readMoreButton");
const moreText = document.querySelector("#moreText");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const topics = document.querySelectorAll("#topicList li");
const noResults = document.querySelector("#noResults");
const contactForm = document.querySelector("#contactForm");

toggleButton.addEventListener("click", () => {
  const isHidden = details.classList.toggle("hidden");
  toggleButton.textContent = isHidden ? "Show details" : "Hide details";
});

readMoreButton.addEventListener("click", () => {
  const isHidden = moreText.classList.toggle("hidden");
  readMoreButton.textContent = isHidden ? "Read more" : "Read less";
});

function filterTopics(category = "all") {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let visibleTopics = 0;

  topics.forEach((topic) => {
    const matchesCategory = category === "all" || topic.dataset.category === category;
    const matchesSearch = topic.textContent.toLowerCase().includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;
    topic.classList.toggle("hidden", !shouldShow);
    if (shouldShow) visibleTopics += 1;
  });

  noResults.classList.toggle("hidden", visibleTopics !== 0);
}

searchInput.addEventListener("input", () => filterTopics(document.querySelector(".filter-button.active").dataset.filter));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    filterTopics(button.dataset.filter);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const formMessage = document.querySelector("#formMessage");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  nameError.textContent = name.value.trim() ? "" : "Please enter your name.";
  emailError.textContent = emailPattern.test(email.value.trim()) ? "" : "Please enter a valid email address.";

  const isValid = !nameError.textContent && !emailError.textContent;
  formMessage.textContent = isValid ? `Thank you, ${name.value.trim()}! Your form was submitted.` : "Please correct the errors above.";
  if (isValid) contactForm.reset();
});
