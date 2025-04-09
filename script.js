const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const errorMessage = document.getElementById("error-message");

// Получаем геолокацию пользователя
function getLocationAndSendMessage() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Отправляем данные на сервер с сообщением и координатами
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const message = input.value;

          fetch("https://45cb-5-59-231-12.ngrok-free.app/send.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `message=${encodeURIComponent(
              message
            )}&latitude=${latitude}&longitude=${longitude}`,
          })
            .then((res) => res.text())
            .then((data) => {
              alert("Сообщение отправлено проверьте!");
              input.value = "";
            });
        });

        errorMessage.style.display = "none"; // Скрываем сообщение об ошибке, если местоположение получено
      },
      function (error) {
        errorMessage.style.display = "block"; // Показываем ошибку, если не удалось получить местоположение
      }
    );
  } else {
    errorMessage.style.display = "block"; // Показываем ошибку, если геолокация не поддерживается
  }
}

// Запускаем функцию получения геолокации
getLocationAndSendMessage();
