const btn = document.querySelector(".btn__add"),
  input = document.querySelector(".input"),
  option = document.querySelector("option"),
  datalist = document.querySelector("#history");

btn.addEventListener("click", () => {
  newOption = option.cloneNode(true);
  newOption.value = input.value;
  datalist.appendChild(newOption);
});
