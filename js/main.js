// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее

const list = document.querySelector(".list");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
async function getData() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20"
  );
  const data = await res.json();
  //   console.log(data.results);
  return data;
}

// getData();
render();
async function render() {
  const data = await getData();
  const pokemonList = data.results;
  pageTotalCount = Math.ceil(data.count / 20);
  list.innerHTML = "";
  pokemonList.forEach(async (item) => {
    const res = await fetch(item.url);
    const data = await res.json();
    const pokemonsTypes = data.types[0];
    const imageUrl = data.sprites.front_default;
    list.innerHTML += `
    <div class="card">
        <div class="first-content">
          <img
            class="image"
            src="${imageUrl}"
            alt=""
          />
          <span>${data.name}</span>
        </div>
        <div class="second-content">
          <span>name:${data.name}</span>
          <span>type:${pokemonsTypes.type.name}</span>
          <span>height:${data.height}</span>
          <span>weight:${data.weight}</span>
        </div>
      </div>
    `;
  });
}

// prev.addEventListener("click", () => {
//   if (page <= 1) {
//     return;
//   }
//   page--;
//   render();
// });

// next.addEventListener("click", (e) => {
//   if (page >= pageTotalCount) {
//     return;
//   }
//   page++;
//   render();
// });
